import { useEffect } from 'react';
import { Select, Loader, Group, Text, createStyles } from '@mantine/core';
import inputStyles from '@/styles/inputStyles';
import { ImWarning } from 'react-icons/im';

const useStyles = createStyles((theme) => ({
  border: {
    '& input': {
      border: `1px solid ${theme.colors.red[5]}`,
    },
  },
}));

export default function StatesSelect({
  states = [],
  stateId,
  setStateId,
  setCityId,
  isSuccess,
  isError,
  isFetching,
  isInvalidState,
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
  const { classes, cx } = useStyles();

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
        <>
          <Select
            sx={inputStyles}
            className={cx({ [classes.border]: isInvalidState })}
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
          {isInvalidState && <Text color="red">Please choose your state of country</Text>}
        </>
      )}
    </>
  );
}
