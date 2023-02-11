import { useState } from 'react';
import { Title, Stack, Grid } from '@mantine/core';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProfileDetails from '../roles/profile/ProfileDetails';
import PersonalDetails from '../roles/profile/PersonalDetails';
import { useScrollLock } from '@mantine/hooks';
import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';

export function Profile() {
  const [scrollLocked, setScrollLocked] = useScrollLock();
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
          <PersonalDetails
            setScrollLocked={setScrollLocked}
            setVisibleOverlay={setVisibleOverlay}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default Profile;
