import { useState } from 'react';
import CreateUpdateCourse from './CreateUpdateCourse';
import { IconSettings, IconPhoto, IconMessageCircle } from '@tabler/icons';
import { Group, Box, Menu, Button as MantineButton, ActionIcon } from '@mantine/core';

import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import ButtonWhite from '@/components/common/ButtonWhite';
import Switch from '@/components/common/Switch';
import { SiAddthis } from 'react-icons/si';
import { FaChevronDown } from 'react-icons/fa';
import { MdGrid4X4 } from 'react-icons/md';

import PageTitle from '@/components/common/PageTitle';

const pageTitle = () => (
  <PageTitle title="Add New Course">
    <Group>
      <Button
        compact
        color="lmsSecondary"
        component={Link}
        to="/dashboard/student/index"
        leftIcon={<SiAddthis size={14} />}
      >
        Preview
      </Button>
      <Button
        compact
        color="green"
        component={Link}
        to="/dashboard/student/index"
        leftIcon={<SiAddthis size={14} />}
      >
        Publish
      </Button>
      <Box>
        <Menu shadow="md">
          <Menu.Target>
            {/* <MantineButton
              compact
              sx={(theme) => ({
                backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                textTransform: 'uppercase',

                '&:hover': {
                  backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                },
              })}
              variant="outline"
              component="div"
              color="lmsLayout"
              rightIcon={<FaChevronDown size={14} />}
            >
              More
            </MantineButton> */}
            <ActionIcon
              variant="transparent"
              sx={(theme) => ({
                backgroundColor: theme.white,
                '&:hover': { backgroundColor: theme.colors.lmsLayout[1] },
              })}
            >
              <MdGrid4X4 size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Group>
  </PageTitle>
);

export function CreateNewCourse() {
  const [course, setCourse] = useState(null);
  return <CreateUpdateCourse pageTitle={pageTitle()} course={course} setCourse={setCourse} />;
}

export default CreateNewCourse;
