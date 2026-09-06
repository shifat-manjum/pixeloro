import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

export default function AuthWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
