import { createStyles, Flex, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

const useStyles = createStyles((theme) => ({
  reactRouterLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  sideBarLink: {
    padding: '10px 24px',

    // borderTopLeftRadius: '100px',
    // borderBottomLeftRadius: '100px',
    borderRadius: '4px',
    transition: 'all 300ms ease-in',

    '&:hover': {
      backgroundColor: theme.colors.lmsLayout[2],
      paddingRight: '16px',
    },
  },
  sideBarLinkActive: {
    // backgroundColor: `${theme.colors.lmsPrimary[6]}!important`,
    backgroundImage: `linear-gradient(to top right,${theme.colors.lmsPrimary[9]}, ${theme.colors.lmsPrimary[5]})`,
    color: theme.colors.lmsPrimary[0],
    paddingRight: '16px',
  },
}));

export function SideBarLink({ children, isActive, href = 'notFound', setSidebarOpened }) {
  const { classes, cx } = useStyles();

  return (
    <Link to={href} className={classes.reactRouterLink}>
      <Flex
        justify="space-between"
        align="center"
        className={cx(classes.sideBarLink, { [classes.sideBarLinkActive]: isActive })}
        onClick={() => setSidebarOpened((o) => !o)}
      >
        <Group>{children}</Group>
        <BiChevronRight size={16} />
      </Flex>
    </Link>
  );
}

export default SideBarLink;
