import { Route, Routes, BrowserRouter } from 'react-router-dom';

import AuthLayout from '@/layout/AuthLayout';
// import Login from '@/components/authentication/Login';
// import Register from '@/components/authentication/Register';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';

export function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AuthRoutes;
