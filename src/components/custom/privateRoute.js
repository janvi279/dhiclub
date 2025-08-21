import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { getToken, getRole, removeToken } from '../../../utils/cookies/cookies'
import NotAuthrized from '../../../pages/NotAuthrized';


export default function PrivateRoute() {
  const token = getToken(); // Get token to check if the user is authenticated
  const role = getRole(); // Get user role from cookies or wherever it's stored
  const location = useLocation(); // Get the current route path

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to='/login' />;
  }

  // Check if the user has permission to access the current route
  const hasAccess = filterRoutesForRole(role, location.pathname);

  if (!hasAccess) {
    // If the user doesn't have access, show Not Authorized page or redirect elsewhere
    return <NotAuthrized />
  }

  // If the user has access, render the requested component
  return <Outlet />;
}
