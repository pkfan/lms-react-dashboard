import { useEffect } from 'react';
import { Select, Loader, Group, Text } from '@mantine/core';
import inputStyles from '@/styles/inputStyles';
import { ImWarning } from 'react-icons/im';

export default function StatesSelect({
  states = [],
  stateId,
  setStateId,
  setCityId,
  isSuccess,
  isError,
  isFetching,
}) {
  if (isSuccess) {
    states = states?.map((state) => ({
      label: state.name,
      value: state.id,
    }));
  }
  if (isFetching) {
    stateId = '';
  }

  useEffect(() => {
    setCityId('');
  }, [stateId]);

  return (
    <>
      {isFetching && (
        <Group>
          <Loader size="sm" />
          <Text color="lmsPrimary">Loading States</Text>
        </Group>
      )}
      {isError && (
        <Group>
          <ImWarning size={16} style={{ color: 'red' }} />
          <Text color="red">Error while loading states, please refresh window</Text>
        </Group>
      )}
      {isSuccess && states.length > 0 && (
        <Select
          sx={inputStyles}
          withAsterisk
          label="State"
          placeholder="Select state"
          data={states}
          dropdownPosition="bottom"
          searchable
          maxDropdownHeight={400}
          nothingFound="Not Found"
          value={stateId}
          onChange={setStateId}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
      )}
    </>
  );
}
