import { Route, Routes, BrowserRouter } from 'react-router-dom';

import {
  AuthLayout,
  ProfileLmsLayout,
  StudentLmsLayout,
  InstructorLmsLayout,
  AdminLmsLayout,
} from '@/layout';

// Auth pages
import {
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  SuccessfullyVerifiedEmail,
  UnverifyEmailNotification,
  Profile,
} from '@/views/auth/pages';

// instructor pages
import {
  Course as InstructorCourse,
  CreateNewCourse as InstructorCreateNewCourse,
  UpdateCourse as InstructorUpdateCourse,
  Lesson as InstructorLesson,
  CourseAttachment as InstructorCourseAttachment,
} from '@/views/roles/instructor/pages';

// admin pages
import {
  Category,
  CreateCategory,
  UpdateCategory,
  AdminCourseList,
} from '@/views/roles/admin/pages';

import Course from '@/views/pages/Course';
import Dashboard from '@/views/pages/Dashboard';
import Instructor from '@/views/pages/Instructor';
import Student from '@/views/pages/Student';

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
            <Route path="attachments" element={<InstructorCourseAttachment />} />
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
          <Route path="course" element={<AdminCourseList />} />
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
