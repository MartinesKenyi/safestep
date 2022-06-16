import React, { createContext, useEffect, useReducer } from 'react';

import axiosApi, { axiosConToken, fetchConToken } from '../../helpers/axios';
import { Delictivo, DelictivosResponse } from '../../interfaces/delictivo-interfaces';
import { delictivoReducer } from './delictivo-reducer';

type ProductsContextProps = {
    delictivos: Delictivo[];
    registerDelictivo: (tempUri: string | undefined, delictivo: Delictivo) => void;
    loadDelictivoById: (id: string) => Promise<Delictivo>;
    deleteDelictivo: (id: string) => Promise<Delictivo>;
    deleteImageDelectivo: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
}

const delictivoInitialState = {
    delictivos: [],
    errorMessage: ''
}

export const DelictivosContext = createContext({} as ProductsContextProps);

export const DelictivosProvider = ({ children }: any) => {

    // const [delictivos, setDelictivos] = useState<Delictivo[]>([]);
    const [state, dispatch] = useReducer(delictivoReducer, delictivoInitialState);

    useEffect(() => {
        loadDelictivos();
    }, [])


    const loadDelictivos = async () => {
        const resp: DelictivosResponse = await axiosConToken('/delictivo');
        if (resp.ok) {
            dispatch({
                type: 'loadDelictivo',
                payload: { delictivos: resp.delictivos }
            });
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
        }
    }


    const registerDelictivo = async (tempUri: any | undefined, delictivo: Delictivo | any) => {

        let formData = new FormData();

        if (tempUri) {
            formData.append("archive", tempUri);
        }

        Object.keys(delictivo).forEach(key => {
            formData.append(key, delictivo[key])
        });

        const resp = await fetchConToken('/delictivo', 'POST', formData);
        if (resp.ok) {
            dispatch({
                type: 'addDelictivo',
                payload: { delictivo: resp.delictivo }
            });
            return resp
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
            return resp
        }

    }

    // const startUploading = ( uri: any ) => {

    // }
    // const registerReport = async (report: Report): Promise<any> => {
    //     const resp: any = await axiosConToken('/report', report, 'POST');
    //     if (resp.ok) {
    //         const newDelictivo = state.delictivos.find(delictivo => delictivo.id === resp.report.delictivo)
    //         if (newDelictivo) {
    //             dispatch({
    //                 type: 'updateDelictivo',
    //                 payload: { id: newDelictivo.id || '', delictivo: { ...newDelictivo, reports: [resp.report] } }
    //             });
    //             return resp
    //         } else {
    //             dispatch({
    //                 type: 'addError',
    //                 payload: 'no se encontró el delictivo para actualizar'
    //             });
    //             return false
    //         }
    //     } else {
    //         dispatch({
    //             type: 'addError',
    //             payload: JSON.stringify(resp)
    //         });
    //         return false
    //     }
    // }

   

    const loadDelictivoById = async (id: string): Promise<Delictivo> => {
        const resp: Delictivo = await axiosConToken(`/delictivo/${id}`);
        return resp;
    };

    const deleteDelictivo = async (id: string) => {
        const resp: Delictivo = await axiosConToken(`/delictivo/${id}`, {}, 'DELETE');
        return resp;
    }

    // TODO: cambiar ANY
    const deleteImageDelectivo = async (data: any, id: string) => {
    }

    return (
        <DelictivosContext.Provider value={{
            ...state,
            registerDelictivo,
            loadDelictivoById,
            deleteDelictivo,
            deleteImageDelectivo,
        }}>
            {children}
        </DelictivosContext.Provider>
    )
}
