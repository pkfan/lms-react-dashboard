import { Box } from '@mantine/core';

import StudentSidebarLinks from '@/views/users/student/components/StudentSidebarLinks';
import InstructorSidebarLinks from '@/views/users/instructor/components/InstructorSidebarLinks';
import AdminSidebarLinks from '@/views/users/admin/components/AdminSidebarLinks';
import ProfileSidebarLinks from '@/views/auth/components/profile/ProfileSidebarLinks';

export function SideBarBody({ setSidebarOpened, lmsRole }) {
  return (
    <Box>
      {lmsRole == 'student' && <StudentSidebarLinks setSidebarOpened={setSidebarOpened} />}
      {lmsRole == 'instructor' && <InstructorSidebarLinks setSidebarOpened={setSidebarOpened} />}
      {lmsRole == 'admin' && <AdminSidebarLinks setSidebarOpened={setSidebarOpened} />}
      {lmsRole == 'profile' && <ProfileSidebarLinks setSidebarOpened={setSidebarOpened} />}
    </Box>
  );
}

export default SideBarBody;
