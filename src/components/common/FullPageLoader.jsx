import { Loader, Flex } from '@mantine/core';

export function FullPageLoader() {
  return (
    <Flex
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.lmsLayout[2],
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Loader size={50} />
    </Flex>
  );
}

export default FullPageLoader;
