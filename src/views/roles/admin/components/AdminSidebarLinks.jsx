import { Text } from '@mantine/core';
import { AiOutlineDashboard, AiFillSetting } from 'react-icons/ai';
import { MdOutlineVideoLibrary, MdPayment } from 'react-icons/md';
import { ImManWoman } from 'react-icons/im';
import { GiRomanToga } from 'react-icons/gi';
import { BiCategory } from 'react-icons/bi';

import SideBarLinks from '@/components/SideBar/SideBarLinks';
import SideBarLink from '@/components/SideBar/SideBarLink';

export function AdminSidebarLinks({ setSidebarOpened }) {
  return (
    <SideBarLinks>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/index">
        <AiOutlineDashboard size={20} />
        <Text fw={500} fz={16}>
          Dashboard
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/course">
        <MdOutlineVideoLibrary size={20} />
        <Text fw={500} fz={16}>
          Courses
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/student">
        <ImManWoman size={20} />
        <Text fw={500} fz={16}>
          Students
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/instructor">
        <GiRomanToga size={20} style={{ opicity: 0.6 }} />
        <Text fw={500} fz={16}>
          Intructors
        </Text>
      </SideBarLink>
      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/category">
        <BiCategory size={20} style={{ opicity: 0.6 }} />
        <Text fw={500} fz={16}>
          Category
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/payment">
        <MdPayment size={20} />
        <Text fw={500} fz={16}>
          Payment
        </Text>
      </SideBarLink>

      <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/admin/settings">
        <AiFillSetting size={20} />
        <Text fw={500} fz={16}>
          settings
        </Text>
      </SideBarLink>
    </SideBarLinks>
  );
}

export default AdminSidebarLinks;
