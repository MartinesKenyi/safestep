import React from 'react'
import { converDate } from '../helpers/moments'
import { Delictivo } from '../interfaces/delictivo-interfaces'

interface Props {
  delictivos: Delictivo[],
  modalDelictivoEdit: (delictivo: Delictivo, type: string) => void,
  delictivoPublish: (delictivo: Delictivo, type: string) => void,
  type: string
}

const classes = {
  main: 'list-delictivo',
  table: 'list-delictivo__table',
  headTh: 'list-delictivo__head-th',
  bodyTr: 'list-delictivo__body-tr',
  bodyTd: 'list-delictivo__body-td',
  edit: 'list-delictivo__edit',
  publish: 'list-delictivo__publish',
}

const ListDelictivo = ({ delictivos, modalDelictivoEdit, delictivoPublish, type }: Props) => {

  return (
    <div>
      <table className={classes.table}>
        <thead>
          <tr >
            <th className={classes.headTh}>Título</th>
            <th className={classes.headTh}>Fecha</th>
            <th className={classes.headTh}>Estado</th>
            <th className={classes.headTh}></th>
          </tr>
        </thead>
        <tbody>
          {
            delictivos.map((delictivo: Delictivo, idx: number) => (
              <tr key={`${idx}-${delictivo.title}`} className={classes.bodyTr}>
                <td className={classes.bodyTd}>{delictivo.title}</td>
                <td className={`${classes.bodyTd} date`}>{converDate(delictivo.createdAt)}</td>
                <td className={classes.bodyTd}>{delictivo.state || ''}</td>
                <td className={`${classes.bodyTd} actions`}>
                  {
                    delictivo.state === 'preventiva'
                      ? (
                        <span className={`${classes.edit} disabled`} >Editar</span>
                      )
                      : (
                        <span className={classes.edit} onClick={() => modalDelictivoEdit(delictivo, type)}>Editar</span>
                      )
                  }
                  {
                    delictivo.state === 'preventiva' || delictivo.state === 'publicado'
                      ? (
                        <span className={`${classes.publish} disabled`}>Publicar</span>
                      )
                      : (
                        <span className={classes.publish} onClick={() => delictivoPublish(delictivo, type)}>Publicar</span>
                      )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListDelictivo