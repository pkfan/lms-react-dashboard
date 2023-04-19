import { useEffect } from 'react';
import { Stack, Tabs, Text, Paper } from '@mantine/core';
import { useGetCourseStepsQuery } from '@/views/roles/instructor/api';
import { TabStatusIcons as CourseStatusIcons } from '@/components';
// course steps
import {
  Basic,
  Description,
  Requirements,
  Outcomes,
  FAQ,
  Features,
  SEO,
  ThumbnailAndCover,
  Chapters,
  Lessons,
} from '@/views/roles/instructor/components/course/steps';

export function CreateUpdateCourse({ course, pageTitle, setCourse = () => {} }) {
  const {
    isSuccess: isGetCourseStepsSuccess,
    isFetching: isGetCourseStepsFetching,
    isError: isGetCourseStepsError,
    data: steps,
    refetch: refetchSteps,
  } = useGetCourseStepsQuery(course?.id);

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

      {pageTitle}

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
            disabled={steps?.requirements?.enable == false ? false : !steps?.requirements?.complete}
            value="outcomes"
            icon={currentTapStatusIcon(steps?.outcomes)}
          >
            Outcomes
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={steps?.outcomes?.enable == false ? false : !steps?.outcomes?.complete}
            value="faq"
            icon={currentTapStatusIcon(steps?.faq)}
          >
            faq
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={steps?.faq?.enable == false ? false : !steps?.faq?.complete}
            value="features"
            icon={currentTapStatusIcon(steps?.features)}
          >
            features
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={steps?.features?.enable == false ? false : !steps?.features?.complete}
            value="thumbnail"
            icon={currentTapStatusIcon(steps?.thumbnail)}
          >
            thumbnail
          </Tabs.Tab>
          <Tabs.Tab
            sx={{ fontSize: '16px' }}
            disabled={!steps?.thumbnail?.complete}
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
          <Basic setNewCourse={setCourse} course={course} />
        </Tabs.Panel>

        <Tabs.Panel value="description" pl="xs">
          {course && steps && <Description refetchSteps={refetchSteps} course={course} />}
        </Tabs.Panel>

        <Tabs.Panel value="requirements" pl="xs">
          {course && steps && (
            <Requirements
              isEnabled={steps.requirements.enable}
              refetchSteps={refetchSteps}
              course={course}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="outcomes" pl="xs">
          {course && steps && (
            <Outcomes
              isEnabled={steps.outcomes.enable}
              refetchSteps={refetchSteps}
              course={course}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="faq" pl="xs">
          {course && steps && (
            <FAQ isEnabled={steps.faq.enable} refetchSteps={refetchSteps} course={course} />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="features" pl="xs">
          {course && steps && (
            <Features
              isEnabled={steps.features.enable}
              refetchSteps={refetchSteps}
              course={course}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="thumbnail" pl="xs">
          {course && steps && <ThumbnailAndCover refetchSteps={refetchSteps} course={course} />}
        </Tabs.Panel>
        <Tabs.Panel value="seo" pl="xs">
          {course && steps && <SEO refetchSteps={refetchSteps} course={course} />}
        </Tabs.Panel>
        <Tabs.Panel value="chapters" pl="xs">
          {course && steps && <Chapters refetchSteps={refetchSteps} course={course} />}
        </Tabs.Panel>
        <Tabs.Panel value="lessons" pl="xs">
          {course && steps && <Lessons course={course} />}
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

export default CreateUpdateCourse;
