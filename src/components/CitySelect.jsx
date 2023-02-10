import { Select, Loader, Group, Text } from '@mantine/core';
import inputStyles from '@/styles/inputStyles';
import { ImWarning } from 'react-icons/im';

export default function CitySelect({
  cities = [],
  cityId,
  setCityId,
  isSuccess,
  isError,
  isFetching,
}) {
  if (isSuccess) {
    cities = cities?.map((city) => ({
      label: city.name,
      value: city.id,
    }));
  }
  if (isFetching) {
    cityId = '';
  }

  return (
    <>
      {isFetching && (
        <Group>
          <Loader size="sm" />
          <Text color="lmsPrimary">Loading cities</Text>
        </Group>
      )}
      {/* {isError && (
        <Group>
          <ImWarning size={16} style={{ color: 'red' }} />
          <Text color="red">Error while loading cities, please refresh window</Text>
        </Group>
      )} */}
      {isSuccess && (
        <Select
          sx={inputStyles}
          withAsterisk
          label="City"
          placeholder="Select City"
          data={cities}
          dropdownPosition="bottom"
          searchable
          maxDropdownHeight={400}
          nothingFound="Not Found"
          value={cityId}
          onChange={setCityId}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
      )}
    </>
  );
}
