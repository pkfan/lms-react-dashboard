import { Grid, Image, Box, Title, Text, Flex } from '@mantine/core';
import CourseCardAction from './CourseCardAction';
import { FaEdit } from 'react-icons/fa';
import { ImEye } from 'react-icons/im';
import { MdOutlineQuiz, MdOutlineAssignment, MdDeleteForever } from 'react-icons/md';

export function CourseCard({ thumnail }) {
  return (
    <Grid
      sx={(theme) => ({
        border: `1px solid ${theme.colors.lmsLayout[3]}`,
        borderRadius: 16,
        position: 'relative',
      })}
    >
      <Title
        order={3}
        sx={(theme) => ({
          position: 'absolute',
          top: '50%',
          left: -16,
          transform: 'translateY(-50%)',
          backgroundColor: theme.colors.lmsPrimary[2],
          border: `2px solid ${theme.colors.lmsSecondary[5]}`,
          borderRadius: '50%',
          padding: '4px 16px',
          zIndex: 1,
          textAlign: 'center',
        })}
      >
        1
      </Title>
      <Grid.Col span={12} xs={3}>
        <Flex justify="center" align="center" w="100%" h="100%">
          <Image radius="md" src={thumnail} alt="Random unsplash image" />
        </Flex>
      </Grid.Col>
      <Grid.Col span={12} xs={7}>
        <Title order={5}> this is course title and working well and see what happend</Title>
        <Text>Chapters: 6 | Lessons: 65 | Duration: 2 hours 5 minutes </Text>
        <Text>Price: $25</Text>
        <Text>Authers: Pkfan</Text>
        <Text>
          status:{' '}
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colors.yellow[5],
              padding: '2px 8px',
              borderRadius: '100%',
              maxWidth: 'max-content',
              display: 'inline',
              color: '#000',
            })}
          >
            Pending
          </Box>
        </Text>
      </Grid.Col>
      <Grid.Col
        span={12}
        xs={2}
        sx={(theme) => ({
          borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <Flex align="center" justify="center" gap={8} wrap="wrap">
          <CourseCardAction tooltip="View Course Live">
            <ImEye size={24} />
          </CourseCardAction>
          <CourseCardAction tooltip="Edit Course">
            <FaEdit size={24} />
          </CourseCardAction>
          <CourseCardAction tooltip="Delete Course">
            <MdDeleteForever size={24} />
          </CourseCardAction>
          <CourseCardAction tooltip="Assignment (Create Or Edit)">
            <MdOutlineAssignment size={24} />
          </CourseCardAction>
          <CourseCardAction tooltip="Quiz (Create Or Edit)">
            <MdOutlineQuiz size={24} />
          </CourseCardAction>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}

export default CourseCard;
