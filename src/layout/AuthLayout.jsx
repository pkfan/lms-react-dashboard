import { Outlet } from 'react-router-dom';
import { Center } from '@mantine/core';

export function AuthLayout() {
  return (
    <>
      <Center>
        <Outlet />
      </Center>
    </>
  );
}

export default AuthLayout;
