import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LmsLayout from '@/layout/LmsLayout';
import Course from '@/views/pages/Course';
import Dashboard from '@/views/pages/Dashboard';
import Instructor from '@/views/pages/Instructor';
import Student from '@/views/pages/Student';

export function StudentRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="student/" element={<LmsLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course/1/dsfdfsdf/sdfsdfsdf/sdfsdf" element={<Course />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default StudentRoutes;
