import { Switch, Group, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export function LightDarkSwitcher() {
  const theme = useMantineTheme();
  return (
    <Switch
      size="md"
      color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
      onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
      offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
    />
  );
}

export default LightDarkSwitcher;
