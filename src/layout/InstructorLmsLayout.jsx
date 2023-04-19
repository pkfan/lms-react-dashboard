import { useState } from 'react';
import LmsLayout from './LmsLayout';
import { TopBar, SideBar } from '@/components';

export function InstructorLmsLayout() {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  return (
    <LmsLayout>
      <TopBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
      <SideBar
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
        lmsRole="instructor"
      />
    </LmsLayout>
  );
}

export default InstructorLmsLayout;
