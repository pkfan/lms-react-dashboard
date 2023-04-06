import { useState } from 'react';
import CreateUpdateCourse from './CreateUpdateCourse';
import { Group, Box, Menu, Button as MantineButton, ActionIcon } from '@mantine/core';

import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import ButtonWhite from '@/components/common/ButtonWhite';
import Switch from '@/components/common/Switch';
import { SiAddthis } from 'react-icons/si';
import { ImEyeBlocked, ImEye } from 'react-icons/im';
import { BsThreeDots } from 'react-icons/bs';

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
              <BsThreeDots size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<ImEye size={14} />}>Publish</Menu.Item>
            <Menu.Item icon={<ImEyeBlocked size={14} />}>Private</Menu.Item>
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
