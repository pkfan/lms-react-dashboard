import { LoadingOverlay } from '@mantine/core';

export function MainLoadingOverlay({ visibleOvarlay }) {
  return (
    <LoadingOverlay
      sx={{ height: 'calc(97vh)' }}
      visible={visibleOvarlay}
      overlayBlur={3}
      transitionDuration={500}
      overlayOpacity={0.3}
    />
  );
}

export default MainLoadingOverlay;
