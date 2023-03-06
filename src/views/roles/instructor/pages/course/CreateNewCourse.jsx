import { useState, useEffect } from 'react';
import { Stack, Tabs, Text, Paper, Group, Box, Menu, Button as MantineButton } from '@mantine/core';
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

import { TabStatusIcons as CourseStatusIcons } from '@/components/common/TabStatusIcons';

import PageTitle from '@/components/common/PageTitle';

// course steps
import Basic from './steps/Basic';
import Description from './steps/Description';
import Requirements from './steps/Requirements';
import Outcomes from './steps/Outcomes';
import FAQ from './steps/FAQ';
import Features from './steps/Features';
import SEO from './steps/SEO';
import ThumbnailAndCover from './steps/ThumbnailAndCover';
import Chapters from './steps/Chapters';
import { useGetCourseStepsQuery } from '../../api';

export function CreateNewCourse() {
  const [newCourse, setNewCourse] = useState(null);

  const {
    isSuccess: isGetCourseStepsSuccess,
    isFetching: isGetCourseStepsFetching,
    isError: isGetCourseStepsError,
    data: steps,
    refetch: refetchSteps,
  } = useGetCourseStepsQuery(newCourse?.id);

  const [requiremtnsSwitch, setRequiremtnsSwitch] = useState(true);
  const [outcomesSwitch, setOutcomesSwitch] = useState(true);
  const [featuresSwitch, setFeaturesSwitch] = useState(true);
  const [FAQswitch, setFAQswitch] = useState(true);

  useEffect(() => {
    if (isGetCourseStepsSuccess) {
      console.log('isGetCourseStepsSuccess : ', steps);
    }
  }, [isGetCourseStepsSuccess, isGetCourseStepsFetching, isGetCourseStepsError]);

  const currentTapStatusIcon = (step) => {
    if (step && !step.enable) {
      return <CourseStatusIcons status="disable" />;
    } else if (step && step?.complete) {
      return <CourseStatusIcons status="check" />;
    } else {
      return <CourseStatusIcons status="cross" />;
    }
  };

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Add New Course">
        <Group>
          <Button
            compact
            color="lmsSecondary"
            component={Link}
            to="/dashboard/student/index"
            leftIcon={<SiAddthis size={14} />}
          >
            Preview
          </Button>
          <Button
            compact
            color="green"
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
            icon={currentTapStatusIcon(steps?.basic)}
          >
            Basic
          </Tabs.Tab>
          <Tabs.Tab
            disabled={!steps?.basic?.complete}
            sx={{ fontSize: '16px' }}
            value="description"
            icon={currentTapStatusIcon(steps?.description)}
          >
            Description
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.description?.complete}
            value="requirements"
            icon={currentTapStatusIcon(steps?.requirements)}
          >
            Requirements
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.requirements?.complete}
            value="outcomes"
            icon={currentTapStatusIcon(steps?.outcomes)}
          >
            Outcomes
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.outcomes?.complete}
            value="faq"
            icon={currentTapStatusIcon(steps?.faq)}
          >
            faq
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.faq?.complete}
            value="features"
            icon={currentTapStatusIcon(steps?.features)}
          >
            features
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            // disabled={!steps?.features?.complete}
            value="thumnail"
            icon={currentTapStatusIcon(steps?.thumnail)}
          >
            thumnail
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.thumnail?.complete}
            value="seo"
            icon={currentTapStatusIcon(steps?.seo)}
          >
            SEO
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.seo?.complete}
            value="chapters"
            icon={currentTapStatusIcon(steps?.chapters)}
          >
            chapters
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.chapters?.complete}
            value="lessons"
            icon={currentTapStatusIcon(steps?.lessons)}
          >
            lessons
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={true}
            value="quizes"
            icon={currentTapStatusIcon(steps?.quizes)}
          >
            quizes
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={true}
            value="assignment"
            icon={<CourseStatusIcons status="cross" />}
          >
            assignments
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={true}
            value="exams"
            icon={<CourseStatusIcons status="cross" />}
          >
            exams
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="basic" pl="xs">
          <Basic setNewCourse={setNewCourse} course_id={newCourse?.id} />
        </Tabs.Panel>

        <Tabs.Panel value="description" pl="xs">
          {newCourse && steps && (
            <Description refetchSteps={refetchSteps} course_id={newCourse?.id} />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="requirements" pl="xs">
          {newCourse && steps && (
            <Requirements
              isEnabled={steps.requirements.enable}
              refetchSteps={refetchSteps}
              course_id={newCourse?.id}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="outcomes" pl="xs">
          {newCourse && steps && (
            <Outcomes
              isEnabled={steps.outcomes.enable}
              refetchSteps={refetchSteps}
              course_id={newCourse?.id}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="faq" pl="xs">
          {newCourse && steps && (
            <FAQ
              isEnabled={steps.faq.enable}
              refetchSteps={refetchSteps}
              course_id={newCourse?.id}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="features" pl="xs">
          {newCourse && steps && (
            <Features
              isEnabled={steps.features.enable}
              refetchSteps={refetchSteps}
              course_id={newCourse?.id}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="thumnail" pl="xs">
          <ThumbnailAndCover
            thumbnail_id={newCourse?.thumbnail_id}
            cover_id={newCourse?.cover_id}
            course_id={newCourse?.id}
          />
        </Tabs.Panel>
        <Tabs.Panel value="seo" pl="xs">
          <SEO />
        </Tabs.Panel>
        <Tabs.Panel value="chapters" pl="xs">
          <Chapters />
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
