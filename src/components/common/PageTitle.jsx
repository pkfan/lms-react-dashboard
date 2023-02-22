import { Flex, Title } from '@mantine/core';

export function PageTitle({ children, title }) {
  return (
    <Flex
      direction={{ base: 'column', xs: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      sx={{ width: '100%' }}
      gap={16}
    >
      <Title order={2}>{title}</Title>
      {children}
    </Flex>
  );
}

export default PageTitle;
