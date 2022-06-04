import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { CreateNewUser } from '../components/new-user/create-new-user';
import { NewRegistroDelictivo } from '../components/registro-delictivo/registro-delictivo';
import { Reports } from '../components/reportes/reports';
import { NavBar } from '../components/uid/navbar';


export const DashboardView = () => {
  return (
    <>
      <NavBar/>

      <div className="container">

        <Routes>
          <Route path="reports" element={<Reports />} />
          <Route path="registerDelictivo" element={<NewRegistroDelictivo />} />
          <Route path="craeteUser" element={<CreateNewUser />} />

          <Route path="/" element={<Reports />} />

        </Routes>

      </div>

    </>
)
}
