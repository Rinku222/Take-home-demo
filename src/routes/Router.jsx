import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

export default function CustomRouter() {
  return (
    <BrowserRouter>
      <PublicRoutes />
      <ProtectedRoutes />

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
