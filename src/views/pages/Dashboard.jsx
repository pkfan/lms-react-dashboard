import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '@mantine/core';
import FullPageLoader from '@/components/common/FullPageLoader';
import { useGetAuthUserQuery } from '../auth/api';

export function Dashboard() {
  const navigate = useNavigate();
  const { isError, isFetching, isSuccess } = useGetAuthUserQuery();

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError]);

  return (
    <>
      {isFetching && <FullPageLoader />}

      {isSuccess && (
        <Text fz="xl" fw={500}>
          Dashboard page rendered
        </Text>
      )}
    </>
  );
}

export default Dashboard;
