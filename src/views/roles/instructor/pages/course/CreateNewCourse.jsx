import { useState } from 'react';
import { Stack, Tabs, Text, Paper, Group, Box, Menu, Button as MantineButton } from '@mantine/core';
import Overlay from '@/components/common/Overlay';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import ButtonWhite from '@/components/common/ButtonWhite';
import Switch from '@/components/common/Switch';
import { SiAddthis } from 'react-icons/si';
import { FaChevronDown } from 'react-icons/fa';
// import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons';

import CourseStatusIcons from './CourseStatusIcons';

import PageTitle from '@/components/common/PageTitle';

export function CreateNewCourse() {
  const [requiremtnsSwitch, setRequiremtnsSwitch] = useState(false);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Add New Course">
        <Group>
          <Button
            compact
            variant="lmsSecondary"
            component={Link}
            to="/dashboard/student/index"
            leftIcon={<SiAddthis size={14} />}
          >
            Preview
          </Button>
          <Button
            compact
            variant="green"
            component={Link}
            to="/dashboard/student/index"
            leftIcon={<SiAddthis size={14} />}
          >
            Publish
          </Button>
          <Box>
            <Menu shadow="md">
              <Menu.Target>
                <MantineButton
                  compact
                  sx={(theme) => ({
                    backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                    textTransform: 'uppercase',

                    '&:hover': {
                      backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                    },
                  })}
                  variant="outline"
                  component="div"
                  color="lmsLayout"
                  rightIcon={<FaChevronDown size={14} />}
                >
                  More
                </MantineButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Group>
      </PageTitle>

      <Tabs
        color="dark"
        variant="outline"
        radius="xs"
        orientation="vertical"
        defaultValue="basic"
        sx={(theme) => ({
          '& .mantine-Tabs-tab[data-active]': { backgroundColor: theme.white },
          '& .mantine-Tabs-panel': { paddingLeft: 0, paddingTop: 0 },
          '& .mantine-Paper-root': {
            height: '100%',
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab
            disabled={false}
            sx={{ fontSize: '16px' }}
            value="basic"
            icon={<CourseStatusIcons status="cross" />}
          >
            Basic
          </Tabs.Tab>
          <Tabs.Tab
            disabled={false}
            sx={{ fontSize: '16px' }}
            value="description"
            icon={<CourseStatusIcons status="cross" />}
          >
            Description
          </Tabs.Tab>
          <Tabs.Tab
            disabled={true}
            sx={{ fontSize: '16px' }}
            value="requirements"
            icon={
              requiremtnsSwitch ? (
                <CourseStatusIcons status="cross" />
              ) : (
                <CourseStatusIcons status="cross" />
              )
            }
          >
            Requirements
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="outcomes"
            icon={<CourseStatusIcons status="cross" />}
          >
            Outcomes
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="faq"
            icon={<CourseStatusIcons status="cross" />}
          >
            faq
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="features"
            icon={<CourseStatusIcons status="cross" />}
          >
            features
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="thumnail"
            icon={<CourseStatusIcons status="cross" />}
          >
            thumnail
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="seo"
            icon={<CourseStatusIcons status="cross" />}
          >
            SEO
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="chapters"
            icon={<CourseStatusIcons status="cross" />}
          >
            chapters
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="lessons"
            icon={<CourseStatusIcons status="cross" />}
          >
            lessons
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="quizes"
            icon={<CourseStatusIcons status="cross" />}
          >
            quizes
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="assignment"
            icon={<CourseStatusIcons status="cross" />}
          >
            assignment
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            sx={{ fontSize: '16px' }}
            value="exams"
            icon={<CourseStatusIcons status="cross" />}
          >
            exams
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="basic" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="description" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
            <Text>this is forst tab</Text>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="requirements" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Group position="right">
              <Switch
                checkedSwitch={requiremtnsSwitch}
                setCheckedSwitch={setRequiremtnsSwitch}
                sx={{ transform: 'translateY(-8px)' }}
              />
            </Group>
            <Box sx={{ position: 'relative' }}>
              {!requiremtnsSwitch && <Overlay />}
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
              <Text>this is forst tab</Text>
            </Box>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="outcomes" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>outcomes</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="faq" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>faq</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="features" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>features</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="thumnail" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>thumnail</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="seo" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>seo</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="chapters" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>chapters</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="lessons" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>lessons</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="quizes" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>quizes</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="assignment" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>assignment</Text>
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="exams" pl="xs">
          <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
            <Text>exams</Text>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

export default CreateNewCourse;
