import React, { useContext } from 'react'
import ListDelictivo from '../components/list-delictivos';
import { DelictivosContext } from '../context/auth/delictivo-context';
import { Delictivo } from '../interfaces/delictivo-interfaces';

interface Props {
  modalDelictivoEdit: (delictivo: Delictivo, type: string) => void,
  delictivoPublish: (delictivo: Delictivo, type: string) => void,
}

export const ListPreventiveFactView = ({modalDelictivoEdit, delictivoPublish}: Props) => {
  const { preventives: delictivos } = useContext(DelictivosContext);

  return (
    <>
      <ListDelictivo 
        delictivos={delictivos}
        modalDelictivoEdit={modalDelictivoEdit}
        delictivoPublish={delictivoPublish}
        type='preventive'
      />
    </>
  )
}
