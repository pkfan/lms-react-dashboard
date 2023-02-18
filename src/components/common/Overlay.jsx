import { Overlay as MantineOverlay } from '@mantine/core';

export function Overlay() {
  return <MantineOverlay opacity={0.4} blur={1} color="#fff" zIndex={5} />;
}

export default Overlay;
