import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Stack, Flex, Text, Paper } from '@mantine/core';
import Button from '@/components/common/Button';
import { BsUpload, MdShopTwo } from '@/components/icons';

export function Lessons({ course }) {
  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="space-between">
          <Text>
            <b>Course:</b> {course.title}
          </Text>
        </Flex>
        <Stack
          spacing="lg"
          py={16}
          sx={(theme) => ({
            border: `1px solid ${theme.colors.lmsLayout[4]}`,
            borderRadius: 4,
            margin: 8,
            position: 'relative',
          })}
        >
          <Stack
            w="70%"
            mx="auto"
            justify="center"
            align="center"
            sx={(theme) => ({ color: theme.colors.lmsSecondary[6] })}
          >
            <MdShopTwo size={150} />

            <Button
              component={Link}
              to="/dashboard/instructor/lessons"
              type="submit"
              color="lmsLayout"
              leftIcon={<BsUpload size={18} />}
            >
              Upload Lessons and Files
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default Lessons;
