import { Link, Typography } from '@mui/material';

export function FindJobsTextBelow() {
  return (
    <Typography sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
      <Link sx={{ fontWeight: '600' }} href="amir.com" underline="hover">
        Employers: Post a job
      </Link>
      <span>&ensp; &#8211; Your next hire is here</span>
    </Typography>
  );
}

export default FindJobsTextBelow;
