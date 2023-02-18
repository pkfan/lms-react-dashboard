import { Text } from '@mantine/core';
import { AiOutlineDashboard, AiFillSetting } from 'react-icons/ai';
import { MdOutlineVideoLibrary, MdPayment } from 'react-icons/md';
import { ImManWoman } from 'react-icons/im';
import { GiRomanToga } from 'react-icons/gi';

import SideBarLinks from '@/components/SideBar/SideBarLinks';
import SideBarLink from '@/components/SideBar/SideBarLink';

export function AdminSidebarLinks({ setSidebarOpened }) {
  return (
    <SideBarLinks>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/index">
        <AiOutlineDashboard size={24} />
        <Text fw={500}>Dashboard</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/course">
        <MdOutlineVideoLibrary size={24} />
        <Text fw={500}>Courses</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/student">
        <ImManWoman size={24} />
        <Text fw={500}>Students</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/instructor">
        <GiRomanToga size={24} style={{ opicity: 0.6 }} />
        <Text fw={500}>Intructors</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/payment">
        <MdPayment size={24} />
        <Text fw={500}>Payment</Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/settings">
        <AiFillSetting size={24} />
        <Text fw={500}>settings</Text>
      </SideBarLink>
    </SideBarLinks>
  );
}

export default AdminSidebarLinks;
