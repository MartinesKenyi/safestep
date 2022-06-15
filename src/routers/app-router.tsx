import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
// import { NavBar } from '../components/uid/navbar';

import { DashboardView } from '../views/dashboard-view';
// import { LoginView } from '../views/login-view';
import { ValidateAccount } from './validate-account';

export const AppRouter = () => {

  return (
    <>
      {/* <NavBar /> */}

      <Router>
        <Routes>

          <Route
            path="/*"
            element={
              <ValidateAccount>
                <DashboardView />
              </ValidateAccount>}
          />
          {/* <Route path='/login' element={<LoginView />} /> */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </Router>
    </>
  )
}


