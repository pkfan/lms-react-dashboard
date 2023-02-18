import { Text } from '@mantine/core';

import SideBarLinks from '@/components/SideBar/SideBarLinks';
import SideBarLink from '@/components/SideBar/SideBarLink';

export function ProfileSidebarLinks({ setSidebarOpened }) {
  return (
    <SideBarLinks>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/index">
        <Text fw={500}>Your Profile</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/student">
        <Text fw={500}>Student Profile</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/instructor">
        <Text fw={500}>Intructor Profile</Text>
      </SideBarLink>
    </SideBarLinks>
  );
}

export default ProfileSidebarLinks;
