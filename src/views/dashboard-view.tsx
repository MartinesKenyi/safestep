import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { NavBar } from '../components/uid/navbar';

import { DelictivosScreem } from '../routers/delictivo-screem';
import { RegisterScreem } from '../routers/register-screem';
import { ReportsScreen } from '../routers/reports';


export const DashboardView = () => {
  return (
    <>
      <RegisterScreem />
    </>
)
}
