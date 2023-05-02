import { Flex } from '@mantine/core';
export function CategoryList({ children }) {
  return (
    <Flex p={16} gap={16} wrap="wrap" justify="space-evenly" align="center">
      {children}
    </Flex>
  );
}

export default CategoryList;
