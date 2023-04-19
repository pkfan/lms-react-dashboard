import { useState } from 'react';
import LmsLayout from './LmsLayout';
import { SideBar, TopBar } from '@/components';

export function ProfileLmsLayout() {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  return (
    <LmsLayout>
      <TopBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
      <SideBar
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
        lmsRole="profile"
      />
    </LmsLayout>
  );
}

export default ProfileLmsLayout;
