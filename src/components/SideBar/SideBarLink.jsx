import { createStyles, Flex, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import useIsActiveSidebarLink from '@/hooks/useIsActiveSidebarLink';

const useStyles = createStyles((theme) => ({
  reactRouterLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  sideBarLink: {
    padding: '4px 8px',

    // borderTopLeftRadius: '100px',
    // borderBottomLeftRadius: '100px',
    borderRadius: '4px',
    transition: 'all 300ms ease-in',

    '&:hover': {
      backgroundColor: theme.colors.lmsLayout[2],
      paddingRight: '4px',
    },
  },
  sideBarLinkActive: {
    // backgroundColor: `${theme.colors.lmsPrimary[6]}!important`,
    backgroundImage: `linear-gradient(${theme.colors.lmsPrimary[4]}, ${theme.colors.lmsPrimary[9]})`,
    color: theme.colors.lmsPrimary[0],
    paddingRight: '16px',
  },
}));

export function SideBarLink({ children, href = 'notFound', setSidebarOpened }) {
  const { classes, cx } = useStyles();
  const isActiveLink = useIsActiveSidebarLink();

  const targetSegment = href.split('/')[3];
  const isActive = isActiveLink(targetSegment);
  // console.log('target segment', targetSegment);

  return (
    <Link to={href} className={classes.reactRouterLink}>
      <Flex
        justify="space-between"
        align="center"
        className={cx(classes.sideBarLink, { [classes.sideBarLinkActive]: isActive })}
        onClick={() => setSidebarOpened((o) => !o)}
      >
        <Group>{children}</Group>
        {/* <BiChevronRight size={16} className="htmlRtlIcon" /> */}
      </Flex>
    </Link>
  );
}

export default SideBarLink;
