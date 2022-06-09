import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { NavBar } from '../components/uid/navbar';

import { RegistroDeInformacion } from '../routers/registro-information';
import { RegisterView } from './register-view';
import { ReportsScreen } from '../routers/reports';


export const DashboardView = () => {
  return (
    <>
      {/* <RegisterView /> */}
      <RegistroDeInformacion />
    </>
)
}
