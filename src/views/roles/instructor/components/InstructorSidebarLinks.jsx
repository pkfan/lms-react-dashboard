import { Text } from '@mantine/core';
import { AiOutlineDashboard, AiFillSetting } from 'react-icons/ai';
import { MdOutlineVideoLibrary, MdPayment } from 'react-icons/md';
import { ImManWoman } from 'react-icons/im';
import { MdOutlineVideoCameraFront } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr';

import SideBarLinks from '@/components/SideBar/SideBarLinks';
import SideBarLink from '@/components/SideBar/SideBarLink';

export function InstructorSidebarLinks({ setSidebarOpened }) {
  return (
    <SideBarLinks>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/index">
        <AiOutlineDashboard size={20} />
        <Text fw={500} fz={16}>
          Dashboard
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/course">
        <MdOutlineVideoLibrary size={20} />
        <Text fw={500} fz={16}>
          Courses
        </Text>
      </SideBarLink>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/lessons">
        <MdOutlineVideoCameraFront size={20} style={{ opicity: 0.6 }} />
        <Text fw={500} fz={16}>
          Lessons
        </Text>
      </SideBarLink>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/student">
        <ImManWoman size={20} />
        <Text fw={500} fz={16}>
          Students
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/payment">
        <MdPayment size={20} />
        <Text fw={500} fz={16}>
          Payment
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/settings">
        <AiFillSetting size={20} />
        <Text fw={500} fz={16}>
          settings
        </Text>
      </SideBarLink>
    </SideBarLinks>
  );
}

export default InstructorSidebarLinks;
