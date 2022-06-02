import { BrowserRouter as Router,
  Route,
  Routes,
  Navigate 
} from 'react-router-dom';
import { DashboardView } from '../views/dashboard-view';
import { ValidateAccount } from './validate-account';

export const AppRouter = () => {

  return (

    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <ValidateAccount>
              <DashboardView />
            </ValidateAccount>}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  )
}

