import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Auth pages
import AuthLayout from '@/layout/AuthLayout';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import ForgetPassword from '@/views/auth/ForgetPassword';
import ResetPassword from '@/views/auth/ResetPassword';
import SuccessfullyVerifiedEmail from '@/views/auth/SuccessfullyVerifiedEmail';
import UnverifyEmailNotification from '@/views/auth/UnverifyEmailNotification';

// lms pages
import LmsLayout from '@/layout/LmsLayout';
import Course from '@/views/pages/Course';
import Dashboard from '@/views/pages/Dashboard';
import Instructor from '@/views/pages/Instructor';
import Student from '@/views/pages/Student';
import Profile from '@/views/pages/Profile';

export function ReactRouter() {
  return (
    // <>
    //   <AuthRoutes />
    //   <AdminRoutes />
    //   <StudentRoutes />
    //   <InstructorRoutes />
    // </>
    <BrowserRouter>
      <Routes>
        {/* auth routes  */}
        <Route path="lms/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="email/verify/:id/:hash" element={<SuccessfullyVerifiedEmail />} />
          <Route path="email/verification" element={<UnverifyEmailNotification />} />
        </Route>
        <Route path="dashboard/" element={<LmsLayout />}>
          <Route path="profile" element={<Profile />} />
          {/* student routes  */}
          <Route path="student/" element={<LmsLayout />}>
            <Route path="index" element={<Dashboard />} />
            <Route path="course" element={<Course />} />
            <Route path="instructor" element={<Instructor />} />
            <Route path="student" element={<Student />} />
          </Route>
          {/* instructor routes  */}
          <Route path="instructor/" element={<LmsLayout />}>
            <Route path="index" element={<Dashboard />} />
            <Route path="course" element={<Course />} />
            <Route path="instructor" element={<Instructor />} />
            <Route path="student" element={<Student />} />
          </Route>
          {/* admin routes  */}
          <Route path="admin/" element={<LmsLayout />}>
            <Route path="index" element={<Dashboard />} />
            <Route path="course" element={<Course />} />
            <Route path="instructor" element={<Instructor />} />
            <Route path="student" element={<Student />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRouter;
