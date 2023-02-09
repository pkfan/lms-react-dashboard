import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export function JobPostedDetail() {
  return (
    <Typography variant="body2" sx={{ color: grey[600] }}>
      Active 2 days ago . from{' '}
      <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
        Javascript in Lahore
      </Typography>
    </Typography>
  );
}

export default JobPostedDetail;
