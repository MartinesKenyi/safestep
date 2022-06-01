import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../components/auth/login';
// import { PublicRoute } from './PublicRoute

export const AppRouter = () => {
    
    return (
  
      <BrowserRouter>
  
        <Routes>
  
          {/* <Route path='/' element={
            <PrivateRoute uid ={uid} >
              <CalendarScreen />
            </PrivateRoute>
          }/> */}
  
          <Route path='/login' element={ <LoginScreen /> }/>
          {/* <Route path='/login' element={
            <PublicRoute >
              <LoginScreen />
            </PublicRoute>
          }/> */}
  
          {/* <Route
            path="*"
            element={<Navigate to="/" />}
          /> */}
  
        </Routes>
  
      </BrowserRouter>
  
    )
  }

