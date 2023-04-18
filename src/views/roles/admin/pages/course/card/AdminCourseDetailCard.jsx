import { ActionIcon, Grid, Title, Box, Stack, Flex } from '@mantine/core';
import Paper from '@/components/common/Paper';

export function AdminCourseDetailCard({ title, count, icon, color = 'lmsPrimary', ...others }) {
  return (
    <Grid.Col md={6} lg={3} sx={{ cursor: 'pointer' }} {...others}>
      <Paper>
        <Flex justify="space-between" align="center">
          <Stack spacing="xs">
            <Title order={5}>{title}</Title>
            <Title order={2}>{count}</Title>
          </Stack>
          <Box
            sx={(theme) => ({
              color: theme.colors[color][6],
            })}
          >
            {icon}
          </Box>
        </Flex>
      </Paper>
    </Grid.Col>
  );
}

export default AdminCourseDetailCard;
