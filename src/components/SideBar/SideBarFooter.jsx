import { Avatar, Box, createStyles, Flex, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'absolute',
    left: 0,
    bottom: '48px',
    width: '100%',
    padding: '8px',
    borderTop: `1px solid ${theme.colors.lmsBorder[3]}`,
    backgroundColor: theme.colors.lmsPrimary[2],
    color: `${theme.colors.lmsPrimary[9]}`,

    '&:hover': {
      backgroundColor: theme.colors.lmsPrimary[3],
    },
  },
  avatar: {
    border: `1px solid ${theme.colors.lmsLayout[4]}`,
  },
}));

export function SideBarFooter() {
  const { classes } = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <Flex justify="space-between" align="center">
        <Avatar className={classes.avatar} radius="sm" />
        <Box>
          <Text fw={700}>Admin</Text>
          <Text fz="sm">Muhammad Amir</Text>
        </Box>
        <IconChevronRight size={18} />
      </Flex>
    </Box>
  );
}

export default SideBarFooter;
