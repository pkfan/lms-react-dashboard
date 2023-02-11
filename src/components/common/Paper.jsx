import { Paper as MantinePaper } from '@mantine/core';

export function Paper({ children, ...others }) {
  return (
    <MantinePaper shadow="sm" p="md" withBorder {...others}>
      {children}
    </MantinePaper>
  );
}

export default Paper;
