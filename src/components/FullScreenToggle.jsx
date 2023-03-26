import { useState, useCallback } from 'react';
import { useFullscreen } from '@mantine/hooks';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { ActionIcon, Tooltip } from '@mantine/core';

export function FullScreenToggle() {
  const { toggle } = useFullscreen();
  const [isFullScreen, setIsFullScreen] = useState(window.isLmsFullScreen);

  const toggleWrapper = useCallback(
    (input) => {
      toggle(input);
      setIsFullScreen(!isFullScreen);
      window.isLmsFullScreen = !isFullScreen;
    },
    [isFullScreen],
  );

  return (
    <Tooltip
      label={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
      color="lmsLayout"
      withArrow
      arrowPosition="center"
    >
      <ActionIcon variant="transparent" onClick={toggleWrapper} sx={{ cursor: 'pointer' }}>
        {isFullScreen ? <BiExitFullscreen size={24} /> : <BiFullscreen size={24} />}
      </ActionIcon>
    </Tooltip>
  );
}

export default FullScreenToggle;
