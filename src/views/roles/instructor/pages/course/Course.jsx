import { useState } from 'react';
import {
  Title,
  Stack,
  Grid,
  Flex,
  Tabs,
  Badge,
  Box,
  Popover,
  TextInput,
  ActionIcon,
  Button as MantineButton,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';
import { SiAddthis } from 'react-icons/si';
import { MdVideoSettings } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';
import { ImEye, ImFilter, ImSearch } from 'react-icons/im';
import Paper from '@/components/common/Paper';
import CourseList from '@/views/course/components/CourseList';
import CourseCard from '@/views/course/components/CourseCard';
import PageTitle from '@/components/common/PageTitle';
export function Course() {
  const [visibleOvarlay, setVisibleOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [openedPopover, setOpenedPopover] = useState(false);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle>
        <Title order={2}>Course Management</Title>
        <Button component={Link} to="create" leftIcon={<SiAddthis size={14} />}>
          Create New Course
        </Button>
      </PageTitle>

      <Paper>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onTabChange={setActiveTab}
          sx={{
            position: 'relative',
            '& .mantine-Tabs-tabsList': {
              paddingRight: '35%',
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              icon={<MdVideoSettings size={20} />}
              value="all"
              color="lmsPrimary"
              sx={{ fontSize: '20px' }}
              rightSection={
                <Badge
                  sx={{ width: 20, height: 20, pointerEvents: 'none' }}
                  variant="filled"
                  color="lmsPrimary"
                  p={0}
                >
                  6
                </Badge>
              }
            >
              All Courses
            </Tabs.Tab>
            <Tabs.Tab
              icon={<ImEye size={20} />}
              value="publish"
              color="lmsPrimary"
              sx={{ fontSize: '20px' }}
              rightSection={
                <Badge
                  sx={{ width: 20, height: 20, pointerEvents: 'none' }}
                  variant="filled"
                  color="lmsPrimary"
                  p={0}
                >
                  4
                </Badge>
              }
            >
              Publish
            </Tabs.Tab>
            <Tabs.Tab
              icon={<RiDraftLine size={20} />}
              sx={{ fontSize: '20px' }}
              value="draft"
              color="lmsSecondary"
              rightSection={
                <Badge
                  sx={{ width: 20, height: 20, pointerEvents: 'none' }}
                  variant="filled"
                  color="lmsSecondary"
                  p={0}
                >
                  3
                </Badge>
              }
            >
              Draft
            </Tabs.Tab>
            <Tabs.Tab
              icon={<FiTrash2 size={20} />}
              sx={{ fontSize: '20px' }}
              value="trash"
              color="red"
              rightSection={
                <Badge
                  sx={{ width: 20, height: 20, pointerEvents: 'none' }}
                  variant="filled"
                  color="red"
                  p={0}
                >
                  0
                </Badge>
              }
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
              }}
            >
              <Popover width={300} trapFocus position="bottom-end" withArrow shadow="md">
                <Popover.Target>
                  <MantineButton
                    sx={(theme) => ({
                      height: 40,
                      paddingLeft: 8,
                      paddingRight: 8,
                    })}
                    leftIcon={<ImSearch size={20} />}
                    color="lmsLayout"
                    variant="transparent"
                    size="lg"
                  >
                    Search
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
              </Popover>
              <Popover width={300} trapFocus position="bottom-end" withArrow shadow="md">
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
              </Popover>
            </Box>
          </Tabs.List>
          <Tabs.Panel value="all">
            <CourseList>
              <CourseCard thumnail="https://sarahcordiner.com/wp-content/uploads/2019/10/YouTube-Thumbnail-300x169.png" />
              <CourseCard thumnail="https://designshack.net/wp-content/uploads/Digital-Marketing-YouTube-Thumbnail-Templates.jpg" />
              <CourseCard thumnail="https://designshack.net/wp-content/uploads/Digital-Marketing-YouTube-Thumbnail-Templates.jpg" />
            </CourseList>
          </Tabs.Panel>
          <Tabs.Panel value="publish">publish panel</Tabs.Panel>
          <Tabs.Panel value="draft">Second panel</Tabs.Panel>
          <Tabs.Panel value="trash">third panel</Tabs.Panel>
        </Tabs>
        <Pagination />
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
