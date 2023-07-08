import { Navigate } from 'react-router-dom';
import fakeAuth from '../fake-auth';

const PrivateRoute = ({ children }) => {
  if (!fakeAuth.isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children;
};

export default PrivateRoute;
