import { IconButton, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

export function JobCardLabel({ StartIcon, EndIcon, textLabel }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      mb={1}
      sx={{
        background: `${green[50]}`,
        maxWidth: 'max-content',
        borderRadius: '4px',
      }}
    >
      <IconButton size="small" color="success">
        <StartIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="body2" sx={{ color: `${green[800]}`, fontWeight: 'bold' }}>
        {textLabel}
      </Typography>
      <IconButton size="small" color="success">
        <EndIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}

export default JobCardLabel;
