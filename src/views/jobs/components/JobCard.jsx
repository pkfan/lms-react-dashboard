import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';

export function JobCard({ children, isCurrent, jobId, setCurrentViewJobId }) {
  const color = isCurrent ? blue[600] : grey[300];
  const JobCardStyle = {
    border: `1px solid ${color}`,
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0 5px 5px ${grey[300]}`,
    },
  };

  return (
    <Box sx={JobCardStyle} onClick={() => setCurrentViewJobId(jobId)}>
      {children}
    </Box>
  );
}

export default JobCard;
