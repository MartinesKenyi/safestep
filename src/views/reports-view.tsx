import React from 'react'

import { ExportCSV } from "../excel/export-to-csv";
import { useDelictivos } from '../hooks/usedate';

const classes = {
  main: 'reports',
  buttonExport: 'reports__btn-export',
  wrapTable: 'reports__wrap-table'
}

export const ReportsView = () => {

  const data = [
    {
      name: "Johson",
      amount: 30000,
      sex: "M",
      is_married: true
    },
    {
      name: "Monika",
      amount: 355000,
      sex: "F",
      is_married: false
    },
    {
      name: "John",
      amount: 250000,
      sex: "M",
      is_married: false
    },
    {
      name: "Josef",
      amount: 450500,
      sex: "M",
      is_married: true
    }
  ];

  const { delictivos, isLoadingDelictivos} = useDelictivos()

  if (isLoadingDelictivos) {
    return <div> cargando data... </div>
  }

  console.log(delictivos)

  return (
    <div className={classes.main}>
      <div className={classes.buttonExport}>
        <ExportCSV csvData={delictivos} fileName="text-excel-doc" />
      </div>

      <div className={classes.main}>
        <table >
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Edison</td>
            <td>Padilla</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Alberto</td>
            <td>Lopez</td>
            <td>94</td>
          </tr>
        </table>
      </div>

    </div>
  )
}
