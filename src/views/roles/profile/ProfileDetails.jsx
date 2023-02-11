import { Text, Avatar, Flex, Title } from '@mantine/core';
import Paper from '@/components/common/Paper';

export function ProfileDetails() {
  return (
    <Paper sx={{ position: 'sticky', top: 80, left: 0 }}>
      <Flex align="center" direction="column" justify="center" gap={16}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/10353856?v=4"
          alt="it's me"
          sx={(theme) => ({
            cursor: 'pointer',
            width: '110px',
            height: '110px',
            border: `3px solid ${theme.colors.lmsPrimary[4]}`,
            borderRadius: '50%',
            transition: 'all 300ms ease-in-out',
            '&:hover': { transform: 'scale(1.1)' },
          })}
        />
        <Title order={3}>Pkfan Amir</Title>
        <Text>
          Use it to create cards, dropdowns, modals and other components that require background
          with shadow
        </Text>
      </Flex>
    </Paper>
  );
}

export default ProfileDetails;
