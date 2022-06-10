import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { NavBar } from '../components/uid/navbar';

import { DelictivoView } from '../views/delictivo-view';
import { RegisterView } from './register-view';
import { ReportsScreen } from '../routers/reports';


export const DashboardView = () => {
  return (
    <>
      <RegisterView />
      {/* <DelictivoView /> */}
    </>
)
}
