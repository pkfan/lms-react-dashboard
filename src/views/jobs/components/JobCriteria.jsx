import NearMeIcon from '@mui/icons-material/NearMe';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { IconButton, Stack, Typography } from '@mui/material';

export function JobCriteria() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      mb={1}
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'start',
        '& > *': { paddingRight: '16px' },
      }}
    >
      <Stack direction="row" alignItems="center">
        <IconButton size="small" color="primary">
          <NearMeIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="body2">Apply from your phone</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton size="small" color="secondary">
          <WatchLaterIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="body2">Urgently Hiring</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <IconButton size="small" color="warning">
          <PersonAddIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="body2">Apply from your phone</Typography>
      </Stack>
    </Stack>
  );
}

export default JobCriteria;
