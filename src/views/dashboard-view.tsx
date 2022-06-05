import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { Reports } from '../components/reportes/reports';
import { NavBar } from '../components/uid/navbar';


export const DashboardView = () => {
  return (
    <>
      <NavBar/>

      <div className="container">

        <Routes>
          <Route path="reports" element={<Reports />} />

          <Route path="/" element={<Reports />} />

        </Routes>

      </div>

    </>
)
}
