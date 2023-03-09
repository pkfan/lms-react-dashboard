import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Auth pages
import AuthLayout from '@/layout/AuthLayout';
import Login from '@/views/auth/pages/Login';
import Register from '@/views/auth/pages/Register';
import ForgetPassword from '@/views/auth/pages/ForgetPassword';
import ResetPassword from '@/views/auth/pages/ResetPassword';
import SuccessfullyVerifiedEmail from '@/views/auth/pages/SuccessfullyVerifiedEmail';
import UnverifyEmailNotification from '@/views/auth/pages/UnverifyEmailNotification';

// lms pages
//Profile
import ProfileLmsLayout from '@/layout/ProfileLmsLayout';

// student
import StudentLmsLayout from '@/layout/StudentLmsLayout';

// instructor
import InstructorLmsLayout from '@/layout/InstructorLmsLayout';
import { Course as InstructorCourse } from '@/views/roles/instructor/pages/course/Course';
import { CreateNewCourse as InstructorCreateNewCourse } from '@/views/roles/instructor/pages/course/CreateNewCourse';
import { UpdateCourse as InstructorUpdateCourse } from '@/views/roles/instructor/pages/course/UpdateCourse';
import { Lesson as InstructorLesson } from '@/views/roles/instructor/pages/course/Lesson';

// admin
import AdminLmsLayout from '@/layout/AdminLmsLayout';
import Category from '@/views/roles/admin/pages/category/Category';
import CreateCategory from '@/views/roles/admin/pages/category/CreateCategory';
import UpdateCategory from '@/views/roles/admin/pages/category/UpdateCategory';

import Course from '@/views/pages/Course';
import Dashboard from '@/views/pages/Dashboard';
import Instructor from '@/views/pages/Instructor';
import Student from '@/views/pages/Student';
import Profile from '@/views/auth/pages/profile/Profile';
import { Lesson } from './../views/roles/instructor/pages/course/Lesson';

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
        {/* profile routes  */}
        <Route path="dashboard/" element={<ProfileLmsLayout />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* student routes  */}
        <Route path="dashboard/student/" element={<StudentLmsLayout />}>
          <Route path="index" element={<Dashboard />} />
          <Route path="course" element={<Course />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
        </Route>
        {/* instructor routes  */}
        <Route path="dashboard/instructor/" element={<InstructorLmsLayout />}>
          <Route path="index" element={<Dashboard />} />
          <Route path="course">
            <Route index element={<InstructorCourse />} />
            <Route path="create" element={<InstructorCreateNewCourse />} />
            <Route path=":id/update" element={<InstructorUpdateCourse />} />
          </Route>
          <Route path="lessons">
            <Route index element={<InstructorLesson />} />
          </Route>

          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
        </Route>
        {/* admin routes  */}
        <Route path="dashboard/admin/" element={<AdminLmsLayout />}>
          <Route path="index" element={<Dashboard />} />
          <Route path="course" element={<Course />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
          <Route path="category">
            <Route index element={<Category />} />
            <Route path="create" element={<CreateCategory />} />
            <Route path=":id/update" element={<UpdateCategory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRouter;
