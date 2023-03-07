import { Switch } from '@mantine/core';

export function SwtichText({
  onLabel = 'Enabled',
  offLabel = 'Disabled',
  checked,
  setChecked = () => {},
  color = 'teal',
}) {
  return (
    <Switch
      sx={{ '& .mantine-Switch-trackLabel': { fontSize: 14 } }}
      onLabel={onLabel}
      offLabel={offLabel}
      size="md"
      color={color}
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}

export default SwtichText;
