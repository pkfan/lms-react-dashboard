import { Route, Routes, BrowserRouter } from 'react-router-dom';

import AuthLayout from '@/layout/AuthLayout';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';

import LmsLayout from '@/layout/LmsLayout';
import Course from '@/views/pages/Course';
import Dashboard from '@/views/pages/Dashboard';
import Instructor from '@/views/pages/Instructor';
import Student from '@/views/pages/Student';

// import AuthRoutes from './AuthRoutes';
// import AdminRoutes from './AdminRoutes';
// import InstructorRoutes from './InstructorRoutes';
// import StudentRoutes from './StudentRoutes';

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
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* student routes  */}
        <Route path="student/" element={<LmsLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course/1/dsfdfsdf/sdfsdfsdf/sdfsdf" element={<Course />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
        </Route>
        {/* instructor routes  */}
        <Route path="instructor/" element={<LmsLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course/1/dsfdfsdf/sdfsdfsdf/sdfsdf" element={<Course />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
        </Route>
        {/* admin routes  */}
        <Route path="admin/" element={<LmsLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course/1/dsfdfsdf/sdfsdfsdf/sdfsdf" element={<Course />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRouter;
