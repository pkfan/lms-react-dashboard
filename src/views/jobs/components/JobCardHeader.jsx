import { Stack, Typography } from '@mui/material';

import JobFeedbackMenu from './JobFeedbackMenu';

export function JobCardHeader({ title, company, location }) {
  return (
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Stack>
        <Typography variant="h6" component="h6" sx={{ fontWeight: '600' }}>
          {title}
        </Typography>
        <Typography variant="body1">{company}</Typography>
        <Typography variant="body1">{location}</Typography>
      </Stack>
      <JobFeedbackMenu />
    </Stack>
  );
}

export default JobCardHeader;
