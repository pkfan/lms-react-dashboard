import { useState } from 'react';

import LmsLayout from './LmsLayout';
import { SideBar } from '@/components/SideBar/SideBar';
import TopBar from '@/components/TopBar';

export function AdminLmsLayout() {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  return (
    <LmsLayout>
      <TopBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
      <SideBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} lmsRole="admin" />
    </LmsLayout>
  );
}

export default AdminLmsLayout;
