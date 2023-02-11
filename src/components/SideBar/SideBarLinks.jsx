import { createStyles, ScrollArea, Stack, Text } from '@mantine/core';
import { AiOutlineDashboard, AiFillSetting } from 'react-icons/ai';
import { MdOutlineVideoLibrary, MdPayment } from 'react-icons/md';
import { ImManWoman } from 'react-icons/im';
import { GiRomanToga } from 'react-icons/gi';

import SideBarLink from './SideBarLink';

const useStyles = createStyles(() => ({
  scrollArea: {
    maxHeight: 'calc(100vh - 60px - 64px)',
  },
  sideBarLinks: {
    margin: '16px',
    // marginLeft: '16px',
    // marginTop: '16px',
  },
}));

export function SideBarLinks({ setSidebarOpened }) {
  const { classes } = useStyles();

  return (
    <ScrollArea.Autosize className={classes.scrollArea}>
      <Stack spacing="xs" className={classes.sideBarLinks}>
        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/index">
          <AiOutlineDashboard size={24} />
          <Text fw={500}>Dashboard</Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/course">
          <MdOutlineVideoLibrary size={24} />
          <Text fw={500}>Courses</Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/student">
          <ImManWoman size={24} />
          <Text fw={500}>Students</Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/instructor">
          <GiRomanToga size={24} style={{ opicity: 0.6 }} />
          <Text fw={500}>Intructors</Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/payment">
          <MdPayment size={24} />
          <Text fw={500}>Payment</Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/student/settings">
          <AiFillSetting size={24} />
          <Text fw={500}>settings</Text>
        </SideBarLink>
      </Stack>
    </ScrollArea.Autosize>
  );
}

export default SideBarLinks;
