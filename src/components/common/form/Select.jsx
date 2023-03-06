import { Select as MantineSelect, createStyles } from '@mantine/core';

export function Select({ label = 'label', ...others }) {
  // const data = [
  //   { value: 'rick', label: 'Rick', group: 'Used to be a pickle' },
  //   { value: 'morty', label: 'Morty', group: 'Never was a pickle' },
  //   { value: 'beth', label: 'Beth', group: 'Never was a pickle' },
  //   { value: 'summer', label: 'Summer', group: 'Never was a pickle' },
  // ];

  return (
    <MantineSelect
      searchable
      nothingFound="No Found"
      dropdownPosition="bottom"
      maxDropdownHeight={400}
      label={label}
      filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      // data={data}
      {...others}
    />
  );
}

export default Select;
