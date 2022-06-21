import React, { useCallback, useEffect, useState } from 'react'

import { ExportCSV } from "../excel/export-to-csv";
import { converDate } from '../helpers/moments';
import { useDelictivos } from '../hooks/usedate';

const classes = {
  main: 'reports',
  buttonExport: 'reports__btn-export',
  wrapTable: 'reports__wrap-table',
  table: 'reports__table',
  head: 'reports__head',
  th: 'reports__head__th',
  body: 'reports__body',
  bodyTr: 'reports__body__tr',
  bodyTd: 'reports__body__td',
}

interface objReport {
  fecha: string,
  tipo: string,
  modalidad: string,
  usuario: string,
  sector: string,
  rol: string,
  titulo: string,
  descripcion: string,
}
const initialObjReport: objReport = {
  fecha: '',
  tipo: '',
  modalidad: '',
  usuario: '',
  sector: '',
  rol: '',
  titulo: '',
  descripcion: '',
}

export const ReportsView = () => {

  const { delictivos, isLoadingDelictivos } = useDelictivos();
  const [dataToReport, setDataToReport] = useState<any[]>([]);
  const [headToReport, setHeadToReport] = useState<string[]>([]);

  const buildReport = useCallback(() => {
    const arrayReport = delictivos.map((delictivo: any) => {
      let objectReport: any = {}

      objectReport.fecha = converDate(delictivo.createdAt);
      objectReport.tipo = delictivo?.modality?.crime?.name || '';
      objectReport.modalidad = delictivo?.modality?.name || '';
      objectReport.usuario = delictivo?.user?.name || '';
      objectReport.sector = delictivo?.user?.sector?.name || '';
      objectReport.rol = delictivo?.user?.role?.name || '';
      objectReport.titulo = delictivo?.title || '';
      // objectReport.descripcion = delictivo?.description || '';
      // objectReport.descripcion = delictivo?.description || '';

      return objectReport;
    })
    setDataToReport(arrayReport);

  }, [delictivos])

  useEffect(() => {
    buildReport()
  }, [buildReport])

  useEffect(() => {
    for (let value of Object.keys(initialObjReport)) {
      setHeadToReport((prev: any) => [...prev, value])
    }
  }, []);

  if (isLoadingDelictivos) {
    return <div> cargando data... </div>
  }

  return (
    <div className={classes.main}>
      <div className={classes.buttonExport}>
        <ExportCSV csvData={dataToReport} fileName="text-excel-doc" />
      </div>

      <div className={classes.wrapTable}>
        <table className={classes.table}>
          <thead className={classes.head}>
            <tr >
              {
                headToReport.map((head: string, idx: number) => (
                  <th key={`${idx}-${head}`} className={classes.th}>{head}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className={classes.body}>
            {
              dataToReport.map((objectReport: any, idx: number) => (
                <tr key={`${idx}-${objectReport.title}`} className={classes.bodyTr}>
                  <td className={`${classes.bodyTd} date`}>{objectReport.fecha}</td>
                  <td className={classes.bodyTd}>{objectReport.tipo}</td>
                  <td className={classes.bodyTd}>{objectReport.modalidad}</td>
                  <td className={classes.bodyTd}>{objectReport.usuario}</td>
                  <td className={classes.bodyTd}>{objectReport.sector}</td>
                  <td className={classes.bodyTd}>{objectReport.rol}</td>
                  <td className={classes.bodyTd}>{objectReport.titulo}</td>
                  <td className={classes.bodyTd}>{objectReport.descripcion}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
