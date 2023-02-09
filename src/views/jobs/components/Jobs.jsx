import { Box } from '@mui/material';

export function Jobs({ children }) {
  return (
    <Box
      sx={{
        ml: { xs: '10px', md: '50px' },
        mr: '10px',
        flexDirection: 'column',
        alignItem: 'center',
        '& > *': { mb: 2 },
      }}
    >
      {children}
    </Box>
  );
}

export default Jobs;
