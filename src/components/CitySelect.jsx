import { Select, Loader, Group, Text, createStyles } from '@mantine/core';
import inputStyles from '@/styles/inputStyles';

const useStyles = createStyles((theme) => ({
  border: {
    '& input': {
      border: `1px solid ${theme.colors.red[5]}`,
    },
  },
}));

export default function CitySelect({
  cities = [],
  cityId,
  setCityId,
  isSuccess,
  isFetching,
  isInvalidCity,
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

  const { classes, cx } = useStyles();

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
        <>
          <Select
            sx={inputStyles}
            withAsterisk
            className={cx({ [classes.border]: isInvalidCity })}
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
          {isInvalidCity && <Text color="red">Please choose your city</Text>}
        </>
      )}
    </>
  );
}
