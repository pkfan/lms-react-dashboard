import { Burger as MantineBurger, MediaQuery, useMantineTheme } from '@mantine/core';

export function Burger({ sidebarOpened, setSidebarOpened }) {
  const theme = useMantineTheme();

  return (
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <MantineBurger
        opened={sidebarOpened}
        onClick={() => setSidebarOpened((o) => !o)}
        size="sm"
        color={theme.colors.gray[6]}
        mr="xl"
      />
    </MediaQuery>
  );
}

export default Burger;
