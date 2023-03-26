import { forwardRef } from 'react';
import { MultiSelect, Avatar, Group, Text } from '@mantine/core';
import getImageUrl from '@/helpers/getImageUrl';

const SelectItem = forwardRef(({ image, label, description, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />

      <div>
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

const transformInstructors = (users) => {
  // {
  //     image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
  //     label: 'Bender Bending Rodríguez',
  //     value: 'Bender Bending Rodríguez',
  //   },

  return users.map((user) => ({
    image: user.avatar ? getImageUrl(user.avatar) : '',
    label: user.full_name,
    value: user.id,
  }));
};

export function MultiSelectUserWithImage({ users, selectedUser, setSelectedUser, ...others }) {
  users = transformInstructors(users);

  return (
    <MultiSelect
      itemComponent={SelectItem}
      value={selectedUser}
      onChange={setSelectedUser}
      data={users}
      searchable
      nothingFound="Nobody here"
      maxDropdownHeight={400}
      filter={(value, selected, item) =>
        !selected &&
        (item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim()))
      }
      {...others}
    />
  );
}

export default MultiSelectUserWithImage;
