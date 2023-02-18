import { createStyles, ScrollArea, Stack } from '@mantine/core';

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

export function SideBarLinks({ children }) {
  const { classes } = useStyles();

  return (
    <ScrollArea.Autosize className={classes.scrollArea}>
      <Stack spacing="xs" className={classes.sideBarLinks}>
        {children}
      </Stack>
    </ScrollArea.Autosize>
  );
}

export default SideBarLinks;
