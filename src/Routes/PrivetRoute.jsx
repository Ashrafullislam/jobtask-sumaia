import React, {useContext} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import { AuthContext } from '../Components/AuthProvider/AuthProvider';

const PrivetRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <div> Loading ... </div>
     
  }

  if (!user?.email) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }
  return children;
};

export default PrivetRoute;
