import { Drawer } from '@mantine/core';

export function RightDrawer({ children, ...others }) {
  return (
    <Drawer
      position="right"
      sx={{
        '& .mantine-Drawer-body': {
          margin: '24px 12px',
          overflowY: 'scroll',
          height: '95%',
        },
        '& .mantine-Drawer-closeButton': {
          position: 'absolute',
          left: 0,
          top: '-2px',
        },
      }}
      {...others}
    >
      {children}
    </Drawer>
  );
}
export default RightDrawer;
