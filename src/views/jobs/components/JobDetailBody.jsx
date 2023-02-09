import { Box } from '@mui/material';

export function JobDeatilBody({ job }) {
  return (
    <Box sx={{ overflowY: 'scroll', height: '100%', padding: '36px 16px 20px' }}>
      {job.description}
    </Box>
  );
}

export default JobDeatilBody;
