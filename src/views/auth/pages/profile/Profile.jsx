import { useState } from 'react';
import { Title, Stack, Grid } from '@mantine/core';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProfileDetails from '../../components/profile/ProfileDetails';
import PersonalDetails from '../../components/profile/PersonalDetails';
import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';
import UpdatePassword from '../../components/profile/UpdatePassword';

export function Profile() {
  const [visibleOvarlay, setVisibleOverlay] = useState(true);

  return (
    <Stack>
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
