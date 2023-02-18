import { useState } from 'react';
import { Switch as MantineSwitch, useMantineTheme, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

export function Switch({ sx, checkedSwitch, setCheckedSwitch }) {
  const theme = useMantineTheme();

  return (
    <MantineSwitch
      sx={{
        '& .mantine-Switch-thumb': { backgroundColor: '#fff', borderWidth: 0 },
        ...sx,
      }}
      checked={checkedSwitch}
      onChange={(event) => setCheckedSwitch(event.currentTarget.checked)}
      color="teal"
      size="md"
      thumbIcon={
        checkedSwitch ? (
          <IconCheck size={18} color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
        ) : (
          <IconX size={18} color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
        )
      }
    />
  );
}

export default Switch;
