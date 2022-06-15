import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { NavBar } from '../components/uid/navbar';
import { DelictivoView } from '../views/delictivo-view';
import { NotFoundPage } from './not-found-page';
import { RegisterView } from './register-view';
import { ReportsView } from './reports-view';


export const DashboardView = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='reports' element={<ReportsView />}/>
        <Route path='registro' element={<RegisterView />}/>
        <Route path='delictivo' element={<DelictivoView />}/>
        <Route path='*' element={<NotFoundPage />} />
        
        <Route path='/' element={<ReportsView />}/>
      </Routes>
    </>
  )
}
