import { Container, Grid } from '@mui/material';
import { useState } from 'react';

import { CircularProgress } from '@/components/common';
import { useGetJobsQuery } from '@/views/jobs/api';
import { Job, JobDetail, Jobs } from '@/views/jobs/components';

export function JobsContainer() {
  const { data: jobs, isLoading, isSuccess } = useGetJobsQuery();
  let firstJobId = isSuccess ? jobs[0].id : 1;
  console.log('jobs[0]', firstJobId);

  const [currentViewJobId, setCurrentViewJobId] = useState(firstJobId);
  return (
    <Container maxWidth="lg" sx={{ margin: '30px', mx: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {isLoading ? <CircularProgress /> : null}
          <Jobs>
            {isSuccess &&
              jobs.map((job) => (
                <Job
                  key={job.id}
                  job={job}
                  currentViewJobId={currentViewJobId}
                  setCurrentViewJobId={setCurrentViewJobId}
                />
              ))}
          </Jobs>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            position: 'relative',
            px: '12px',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {isSuccess && <JobDetail currentViewJobId={currentViewJobId} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default JobsContainer;
