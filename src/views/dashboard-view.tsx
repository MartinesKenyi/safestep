import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { DelictivoView } from '../views/delictivo-view';
import { NotFoundPage } from './not-found-page';
import { RegisterView } from './register-view';
import { ReportsView } from './reports-view';


export const DashboardView = () => {

  return (
    <>
      <div className='container'>

        <Routes>
          <Route path='reports' element={<ReportsView />}/>
          <Route path='register' element={<RegisterView />}/>
          <Route path='delictivo' element={<DelictivoView />}/>
          <Route path='*' element={<NotFoundPage />} />
          
          <Route path='/' element={<ReportsView />}/>

        </Routes>
        
      </div>
    </>
  )
}
