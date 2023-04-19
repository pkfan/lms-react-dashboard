import { useState } from 'react';
import { Title, Stack, Grid } from '@mantine/core';
import { Breadcrumbs, MainLoadingOverlay } from '@/components';
import { ProfileDetails, PersonalDetails, UpdatePassword } from '@/views/auth/components';

export function Profile() {
  const [visibleOvarlay, setVisibleOverlay] = useState(true);

  return (
    <Stack sx={{ width: '100%' }}>
      <MainLoadingOverlay visibleOvarlay={visibleOvarlay} />

      <Breadcrumbs
        links={[
          { title: 'home', href: '#' },
          { title: 'profile', href: '#' },
          { title: 'use-id', href: '#' },
        ]}
      />
      <Title order={2}>Your Profile</Title>
      <Grid>
        <Grid.Col span={12} md={4} sx={{ position: 'relative' }}>
          <ProfileDetails />
        </Grid.Col>
        <Grid.Col span={12} md={8}>
          <Stack>
            <PersonalDetails setVisibleOverlay={setVisibleOverlay} />
            <UpdatePassword />
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default Profile;
