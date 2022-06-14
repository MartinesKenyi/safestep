import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/uid/navbar';

import { DelictivoView } from '../views/delictivo-view';
import { RegisterView } from './register-view';
import { ReportsView } from './reports-view';
import { useAlert } from '../hooks/useAlert';
import { Alert } from '../global-components/alert/alert';


export const DashboardView = () => {


  return (
    <>
      <div className='container'>

        <Routes>
          <Route path='reports' element={<ReportsView />}/>
          <Route path='register' element={<RegisterView />}/>
          <Route path='delictivo' element={<DelictivoView />}/>
          
          <Route path='/' element={<ReportsView />}/>

        </Routes>
        
      </div>
    </>
  )
}
