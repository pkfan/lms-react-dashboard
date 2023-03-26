import { useState, useEffect } from 'react';
import {
  Title,
  Stack,
  Tabs,
  Badge,
  Box,
  Popover,
  TextInput,
  Group,
  Button as MantineButton,
} from '@mantine/core';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import { SiAddthis } from 'react-icons/si';
import { MdVideoSettings } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { BsWatch } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { ImEye, ImFilter, ImSearch, ImEyeBlocked, ImCancelCircle } from 'react-icons/im';
import Paper from '@/components/common/Paper';
import CourseList from '@/views/course/components/CourseList';
import CourseCard from '@/views/course/components/CourseCard';
import PageTitle from '@/components/common/PageTitle';
import queryString from 'query-string';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import CourseInviteInstructors from './components/course/CourseInviteInstructors';
import InstructorTrashCourses from './components/course/InstructorTrashCourses';

export function Course() {
  ////////////////
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState('');

  //////////////
  const location = useLocation();
  const query = location.search;
  const { tab, page, searchString } = queryString.parse(query);
  const [activeTab, setActiveTab] = useState(tab || 'publish');
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (page) {
      setPage(Number(page));
    }
    if (searchString) {
      setSearch(searchString);
    }
  }, []);

  const setPageWithScroll = (page) => {
    window.scroll(0, 0);
    setPage(page);
    console.log('searchQuery', searchQuery);

    const searchQueryObj = { page, tab: activeTab };
    if (search) {
      searchQueryObj['search'] = search;
    }
    setSearchParams(searchQueryObj);
  };

  const submitSearch = () => {
    if (searchQuery) {
      console.log('searchParams', searchParams);

      setPage(1);
      setSearch(searchQuery);
      setSearchParams({ page: 1, tab: activeTab, search: searchQuery });
    }
  };

  const setActiveTabWrapper = (tab) => {
    setPage(1);
    setSearchQuery('');
    setSearch('');
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Course Management">
        <Group>
          <Button compact component={Link} to="create" leftIcon={<SiAddthis size={14} />}>
            New Course
          </Button>
        </Group>
      </PageTitle>

      <Paper>
        <Tabs
          defaultValue="publish"
          value={activeTab}
          onTabChange={setActiveTabWrapper}
          sx={{
            position: 'relative',
            zIndex: 0,
            '& .mantine-Tabs-panel': {
              position: 'relative',
              zIndex: -1,
            },
          }}
        >
          <Tabs.List sx={{ position: 'relative', zIndex: 0 }}>
            <Tabs.Tab
              icon={<ImEye size={18} />}
              value="publish"
              color="green"
              sx={{ fontSize: '16px' }}
            >
              Publish
            </Tabs.Tab>
            <Tabs.Tab
              icon={<ImEyeBlocked size={18} />}
              value="private"
              color="lmsLayout"
              sx={{ fontSize: '16px' }}
            >
              Private
            </Tabs.Tab>
            <Tabs.Tab
              icon={<RiDraftLine size={18} />}
              sx={{ fontSize: '16px' }}
              value="draft"
              color="lmsSecondary"
            >
              Draft
            </Tabs.Tab>
            <Tabs.Tab
              icon={<BsWatch size={18} />}
              sx={{ fontSize: '16px' }}
              value="pending"
              color="orange"
            >
              Pending
            </Tabs.Tab>
            <Tabs.Tab
              icon={<ImCancelCircle size={18} />}
              sx={{ fontSize: '16px' }}
              value="reject"
              color="pink"
            >
              reject
            </Tabs.Tab>
            <Tabs.Tab
              icon={<AiOutlineUsergroupAdd size={18} />}
              sx={{ fontSize: '16px' }}
              value="invites"
              color="yellow"
            >
              Invites
            </Tabs.Tab>
            <Tabs.Tab
              icon={<FiTrash2 size={18} />}
              sx={{ fontSize: '16px' }}
              value="trash"
              color="red"
              // rightSection={
              //   <Badge
              //     sx={{ width: 20, height: 20, pointerEvents: 'none' }}
              //     variant="filled"
              //     color="red"
              //     p={0}
              //   >
              //     0
              //   </Badge>
              // }
            >
              Trash
            </Tabs.Tab>
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 300,
                display: 'flex',
                justifyContent: 'end',
                zIndex: '-1',
              }}
            >
              <Popover width={300} trapFocus position="bottom-end" withArrow shadow="md">
                <Popover.Target>
                  <MantineButton
                    compact
                    sx={(theme) => ({
                      height: 40,
                      paddingLeft: 8,
                      paddingRight: 8,
                      borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
                    })}
                    leftIcon={<ImSearch size={16} />}
                    color="lmsLayout"
                    variant="transparent"
                  ></MantineButton>
                </Popover.Target>
                <Popover.Dropdown
                  sx={(theme) => ({
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                  })}
                >
                  <Stack>
                    <TextInput
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="search from categories"
                    />
                    <Button onClick={submitSearch} variant="lmsSecondary" sx={{ width: '100%' }}>
                      Search
                    </Button>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
              {/* <Popover width={300} trapFocus position="bottom-end" withArrow shadow="md">
                <Popover.Target>
                  <MantineButton
                    sx={(theme) => ({
                      height: 40,
                      paddingLeft: 8,
                      paddingRight: 8,
                      borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
                    })}
                    leftIcon={<ImFilter size={20} />}
                    color="lmsLayout"
                    variant="transparent"
                    size="lg"
                  >
                    Filter
                  </MantineButton>
                </Popover.Target>
                <Popover.Dropdown
                  sx={(theme) => ({
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                  })}
                >
                  <Stack>
                    <TextInput placeholder="search from courses" />
                    <Button variant="lmsSecondary" sx={{ width: '100%' }}>
                      Search
                    </Button>
                  </Stack>
                </Popover.Dropdown>
              </Popover> */}
            </Box>
          </Tabs.List>
          <Tabs.Panel value="publish">
            {activeTab == 'publish' && (
              <CourseList
                tab={activeTab}
                page={activePage}
                search={search}
                setPageWithScroll={setPageWithScroll}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="private">
            {activeTab == 'private' && (
              <CourseList
                tab={activeTab}
                page={activePage}
                search={search}
                setPageWithScroll={setPageWithScroll}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="draft">
            {activeTab == 'draft' && (
              <CourseList
                tab={activeTab}
                page={activePage}
                search={search}
                setPageWithScroll={setPageWithScroll}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="pending">
            {activeTab == 'pending' && (
              <CourseList
                tab={activeTab}
                page={activePage}
                search={search}
                setPageWithScroll={setPageWithScroll}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="reject">
            {activeTab == 'reject' && (
              <CourseList
                tab={activeTab}
                page={activePage}
                search={search}
                setPageWithScroll={setPageWithScroll}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="invites">
            {activeTab == 'invites' && <CourseInviteInstructors />}
          </Tabs.Panel>
          <Tabs.Panel value="trash">
            {' '}
            {activeTab == 'trash' && <InstructorTrashCourses />}
          </Tabs.Panel>
        </Tabs>
      </Paper>
      {/* <Grid>
        <Grid.Col span={12} md={4} sx={{ position: 'relative' }}>
          <CourseDetails />
        </Grid.Col>
        <Grid.Col span={12} md={8}>
          <Stack>
            <PersonalDetails setVisibleOverlay={setVisibleOverlay} />
            <UpdatePassword />
          </Stack>
        </Grid.Col>
      </Grid> */}
    </Stack>
  );
}

export default Course;
