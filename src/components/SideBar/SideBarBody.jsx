import { Box } from '@mantine/core';

import SideBarLinks from './SideBarLinks';

export function SideBarBody({ setSidebarOpened }) {
  return (
    <Box>
      <SideBarLinks setSidebarOpened={setSidebarOpened} />
    </Box>
  );
}

export default SideBarBody;
