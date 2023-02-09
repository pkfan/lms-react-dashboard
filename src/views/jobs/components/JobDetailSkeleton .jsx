import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function JobDetailSkeleton() {
  return (
    <Stack
      spacing={1}
      padding={4}
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#fff',
        zIndex: '10',
      }}
    >
      <Skeleton variant="rectangular" width={250} height={10} />
      <Skeleton variant="rectangular" width={350} height={10} />
      <Skeleton variant="rectangular" width={450} height={60} />
      <Skeleton variant="rounded" width={450} height={60} />
      <Skeleton variant="rounded" width={450} height={300} />
    </Stack>
  );
}

export default JobDetailSkeleton;
