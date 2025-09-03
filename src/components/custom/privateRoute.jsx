import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getToken, getRole } from '../utils/cookies/cookies';
import NotAuthorized from '../../pages/NotAuthorized';



const filterRoutesForRole = (role, path) => {
  switch (role) {
    case 'Admin':
      return true; // Admin has access to all routes

    case 'HR':
      return (
        path === '/' || // Dashboard
        path.startsWith('/team') || // Team-related routes
        path.startsWith('/task') || // Task
        path.startsWith('/company') || // Company
        path.startsWith('/document') || // Document
        path.startsWith('/leave') || // Document
        path.startsWith('/attendance') || // Document
        path.startsWith('/salary') || // Document
        path.startsWith('/360view') || // Document
        path.startsWith('/arview') || // Document
        path.startsWith('/overdue-task') ||
        path === '/profile' ||// Profile
        path === '/notification' ||
        path === '/social-list'
      );

      case 'Team Leader' : 
      return (
        path === '/' ||
        path.startsWith('/task') ||
        path.startsWith('/overdue-task') ||
        path === '/profile' ||
        path === '/notification'
      )

    case 'Social Media Coordinator':
      return (
        path === '/' || // Dashboard
        path.startsWith('/task') || // Task
        path.startsWith('/company-branding') || // Company Branding
        path === '/profile' ||// Profile
        path === '/notification'
      );

    default:
      return (
        path === '/' || // Dashboard
        path.startsWith('/task') || // Task
        path === '/profile' || // Profile
        path === '/notification'
      );
  }
};

export default function PrivateRoute() {
  const token = getToken();
  const role = getRole();
  const location = useLocation();

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  const hasAccess = filterRoutesForRole(role, location.pathname);

  if (!hasAccess) {
    return <NotAuthorized />;
  }

  return <Outlet />;
}