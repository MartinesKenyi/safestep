import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { NavBar } from '../components/uid/navbar';
import { PreventiveView } from './preventive-view';
import { NotFoundPage } from './not-found-page';
import { RegisterView } from './register-view';
import { ReportsView } from './reports-view';
import { RiskMapView } from './risk-map-view';


export const DashboardView = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='reports' element={<ReportsView />}/>
        <Route path='preventivo' element={<PreventiveView />}/>
        <Route path='risk-map' element={<RiskMapView />}/>
        <Route path='registro' element={<RegisterView />}/>
        <Route path='*' element={<NotFoundPage />} />
        
        <Route path='/' element={<ReportsView />}/>
      </Routes>
    </>
  )
}
