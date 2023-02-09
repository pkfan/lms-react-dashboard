import { forwardRef } from 'react';
import { Group, Avatar, Text, Select } from '@mantine/core';
import inputStyles from '@/styles/inputStyles';

const SelectItem = forwardRef(({ image, label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar sx={{ display: 'flex', height: 25 }} src={image} />

      <div>
        <Text size="sm">{label}</Text>
      </div>
    </Group>
  </div>
));

SelectItem.displayName = 'SelectItem';

export default function CountrySelect({ allCountries, countryCode, setCountryCode }) {
  const countries = allCountries.map((country) => ({
    image: country.country_flag_url,
    label: country.country_name,
    value: country.country_code_two,
  }));

  return (
    <Select
      sx={inputStyles}
      withAsterisk
      label="Country"
      placeholder="Select Country"
      itemComponent={SelectItem}
      data={countries}
      dropdownPosition="bottom"
      searchable
      maxDropdownHeight={400}
      nothingFound="Not Found"
      value={countryCode}
      onChange={setCountryCode}
      filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
    />
  );
}
