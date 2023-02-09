import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DoneIcon from '@mui/icons-material/Done';

import {
  JobCard,
  JobCardHeader,
  JobCardLabel,
  JobCriteria,
  JobPostedDetail,
  JobRequirements,
} from '@/views/jobs/components';

export function Job({ job, currentViewJobId, setCurrentViewJobId }) {
  const isCurrent = job.id == currentViewJobId;

  return (
    <JobCard isCurrent={isCurrent} jobId={job.id} setCurrentViewJobId={setCurrentViewJobId}>
      <JobCardHeader title={job.title} company={job.company} location={job.location} />
      <JobCardLabel StartIcon={BusinessCenterIcon} EndIcon={DoneIcon} textLabel="Full-time" />
      <JobCriteria />
      <JobRequirements />
      <JobPostedDetail />
    </JobCard>
  );
}

export default Job;
