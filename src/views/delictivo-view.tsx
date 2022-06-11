import React, { useContext, useState } from 'react'
import { useForm } from '../hooks/useForm';
import { DelictivosContext } from '../context/auth/delictivo-context';
import { AuthContext } from '../context/auth/auth-context';
import { useRoles } from '../hooks/usedate';

interface InterfaceForm {
    modality: '',
    title: '',
    description: '',
    delictivo: '',
}

const classes = {
    main: 'information',
    container: 'information__container',
    wrap: 'information__wrap',
}

export const DelictivoView = () => {

    const { user: userData } = useContext(AuthContext);
    const { registerDelictivo } = useContext(DelictivosContext);
    const { roles } = useRoles();
    const [isEdit, setIsEdit] = useState(true);
    const [tempUri, setTempUri] = useState<string | any>();
    const [dataImage, setDataImage] = useState<string>();


    console.log(tempUri);

    const [values, handleInputChange] = useForm({
        title: '',
        description: '',
    });

    const { title, description } = values;

    const handlePictureClick = () => {
        const input = document.querySelector('#fileSelector') as HTMLInputElement | null;
        if (input != null) {
            input.click();
            console.log(input)
        }
    }

    const handleFileChange = (e: any) => {

        const fileName = e.target.files[0];

        if (fileName) {
            setTempUri(fileName)
        } else {
            console.log('no se recibe el archivo')
        }
        return fileName
    }

    const onPublish = async () => {
        // setIsEdit(false);

        const viewpermise = roles.filter(({ name }) => name !== "CIUDADANO_ROLE").map(rol => rol.id);
        let fileName;
        let type;
        let image;
 
        let tempUri;

        console.log(tempUri)

        // const resp: any = await registerDelictivo(
        //     image,
        //     fileName,
        //     type,
        //     {
        //         user: userData?.uid || '',
        //         modality: null,
        //         latitude: 0,
        //         longitude: 0,
        //         viewpermise: JSON.stringify(viewpermise),
        //         title,
        //         description
        //     }
        // );

        // console.log(resp)
        // if (resp) {
        //     // setIsEdit(true);
        //     console.log(resp)
        // } else {
        //     // setIsEdit(true);
        // }
    }
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h2> Registro de informacion delictivo </h2>
                <input
                    type="text"
                    name='title'
                    placeholder='Título'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    // className='information__text-area'
                    placeholder='Description...'
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                >
                </textarea>
                <div className='btn__wrap-notes'>
                    <button
                        className="btn__notes"
                        onClick={handlePictureClick}
                    >
                        Picture
                    </button>

                </div>

                <div className='information__control-img'>
                    <img
                        src={"https://gestion.pe/resizer/Xd1pTUYOQtjW_diABxFJDMVG0ig=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/SGK2OFHS3VBUJEURBQU4AOGM4E.jpeg"}
                        alt="places" />
                </div>

                <input
                    id="fileSelector"
                    type="file"  //nos permite para buscar un archivo 
                    name="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                <div className='information__control-btn'>
                    <button
                        title='Compartir'
                        // className='information__button'
                        onClick={onPublish}
                    >
                        Publicar
                    </button>
                </div>

            </div>
        </div>
    )
}
 