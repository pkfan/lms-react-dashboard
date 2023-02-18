import { Flex } from '@mantine/core';
export function CourseList({ children }) {
  return (
    <Flex direction="column" p={16} mt={16} gap={36}>
      {children}
    </Flex>
  );
}

export default CourseList;
