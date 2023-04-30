import { createStyles, Flex, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import useIsActiveSubSidebarLink from '@/hooks/useIsActiveSubSidebarLink';
import { FaChevronRight, FaMinus } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  reactRouterLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  sideBarLink: {
    // padding: '4px 8px',
    // margin: '0 16px',
    // borderTopLeftRadius: '100px',
    // borderBottomLeftRadius: '100px',
    borderRadius: '4px',
    transition: 'all 300ms ease-in',

    '&:hover': {
      backgroundColor: theme.colors.lmsLayout[2],
      // paddingRight: '4px',
    },
  },
  sideBarLinkActive: {
    // backgroundColor: `${theme.colors.lmsLayout[6]}!important`,
    backgroundImage: `linear-gradient(${theme.colors.lmsLayout[4]}, ${theme.colors.lmsLayout[9]})`,
    color: theme.colors.lmsLayout[0],
    // paddingRight: '16px',
  },
}));

export function SubSideBarLink({ children, href = 'notFound', setSidebarOpened }) {
  const { classes, cx } = useStyles();
  const isActiveSubLink = useIsActiveSubSidebarLink();

  const isActive = isActiveSubLink(href);
  // console.log('target segment', targetSegment);

  return (
    <Link to={href} className={classes.reactRouterLink}>
      <Flex
        py={4}
        pl={8}
        my={4}
        justify="space-between"
        align="center"
        className={cx(classes.sideBarLink, { [classes.sideBarLinkActive]: isActive })}
        onClick={() => setSidebarOpened((o) => !o)}
      >
        <Group sx={{ gap: 4 }}>
          <FaMinus size={8} style={{ opacity: 0.6 }} />
          {children}
        </Group>
        {/* <BiChevronRight size={16} className="htmlRtlIcon" /> */}
      </Flex>
    </Link>
  );
}

export default SubSideBarLink;
