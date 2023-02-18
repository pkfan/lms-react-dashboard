import { Flex } from '@mantine/core';

export function PageTitle({ children }) {
  return (
    <Flex
      direction={{ base: 'column', xs: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      sx={{ width: '100%' }}
      gap={16}
    >
      {children}
    </Flex>
  );
}

export default PageTitle;
