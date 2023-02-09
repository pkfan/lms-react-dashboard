import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Section } from '@/components/sxHtmlElements';
import { useGetJobQuery } from '@/views/jobs/api';
import { JobDeatilBody, JobDetailHeader, JobDetailSkeleton } from '@/views/jobs/components';

const JobDetailStyle = {
  border: `1px solid ${grey[300]}`,
  borderRadius: '8px',
  position: 'sticky',
  top: '16px',

  height: '95vh',
  maxWidth: 'max-content',
  overflow: 'hidden',
};

export function JobDetail({ currentViewJobId }) {
  const { data: job, isFetching, isSuccess } = useGetJobQuery(currentViewJobId);

  return (
    <Section sx={JobDetailStyle}>
      <Stack direction="column" height="100%" width="100%" minWidth="500px" flexWrap="nowrap">
        {isFetching && <JobDetailSkeleton />}
        {isSuccess && (
          <>
            <JobDetailHeader job={job} />
            <JobDeatilBody job={job} />
          </>
        )}
      </Stack>
    </Section>
  );
}

export default JobDetail;
