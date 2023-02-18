import { useState } from 'react';
import { Title, Stack, Tabs, Text, Paper, Group, Box } from '@mantine/core';
import Overlay from '@/components/common/Overlay';
import { Link } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import Switch from '@/components/common/Switch';
import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';
import { SiAddthis } from 'react-icons/si';

import CourseStatusIcons from './CourseStatusIcons';

import PageTitle from '@/components/common/PageTitle';
export function CreateNewCourse() {
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [requiremtnsSwitch, setRequiremtnsSwitch] = useState(false);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle>
        <Title order={2}>Course Management</Title>
        <Button component={Link} to="/dashboard/student/index" leftIcon={<SiAddthis size={14} />}>
          Create New Course
        </Button>
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
            sx={{ fontSize: '16px' }}
            value="basic"
            icon={<CourseStatusIcons status="check" />}
          >
            Basic
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="description"
            icon={<CourseStatusIcons status="check" />}
          >
            Description
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="requirements"
            icon={
              requiremtnsSwitch ? (
                <CourseStatusIcons status="cross" />
              ) : (
                <CourseStatusIcons status="disable" />
              )
            }
          >
            Requirements
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="outcomes"
            icon={<CourseStatusIcons status="disable" />}
          >
            Outcomes
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="faq"
            icon={<CourseStatusIcons status="cross" />}
          >
            faq
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="features"
            icon={<CourseStatusIcons status="disable" />}
          >
            features
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="thumnail"
            icon={<CourseStatusIcons status="disable" />}
          >
            thumnail
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="seo"
            icon={<CourseStatusIcons status="disable" />}
          >
            SEO
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="chapters"
            icon={<CourseStatusIcons status="disable" />}
          >
            chapters
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="lessons"
            icon={<CourseStatusIcons status="disable" />}
          >
            lessons
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="quizes"
            icon={<CourseStatusIcons status="disable" />}
          >
            quizes
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="assignment"
            icon={<CourseStatusIcons status="disable" />}
          >
            assignment
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            value="exams"
            icon={<CourseStatusIcons status="disable" />}
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
