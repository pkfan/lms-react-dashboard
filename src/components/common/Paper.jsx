import { Paper as MantinePaper } from '@mantine/core';

export function Paper({ children, ...others }) {
  return (
    <MantinePaper radius="lg" shadow="sm" p="md" withBorder {...others}>
      {children}
    </MantinePaper>
  );
}

export default Paper;
