import { Text } from '@mantine/core';
import { AiOutlineDashboard, AiFillSetting } from 'react-icons/ai';
import { MdOutlineVideoLibrary, MdPayment } from 'react-icons/md';
import { ImManWoman } from 'react-icons/im';
import { GiRomanToga } from 'react-icons/gi';

import SideBarLinks from '@/components/SideBar/SideBarLinks';
import SideBarLink from '@/components/SideBar/SideBarLink';

export function StudentSidebarLinks({ setSidebarOpened }) {
  return (
    <SideBarLinks>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/index">
        <AiOutlineDashboard size={20} />
        <Text fw={500} fz={16}>
          Dashboard
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/course">
        <MdOutlineVideoLibrary size={20} />
        <Text fw={500} fz={16}>
          Courses
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/student">
        <ImManWoman size={20} />
        <Text fw={500} fz={16}>
          Students
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/instructor">
        <GiRomanToga size={20} style={{ opicity: 0.6 }} />
        <Text fw={500} fz={16}>
          Intructors
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/payment">
        <MdPayment size={20} />
        <Text fw={500} fz={16}>
          Payment
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/settings">
        <AiFillSetting size={20} />
        <Text fw={500} fz={16}>
          settings
        </Text>
      </SideBarLink>
    </SideBarLinks>
  );
}

export default StudentSidebarLinks;
