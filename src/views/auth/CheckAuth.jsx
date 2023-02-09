import { useGetAuthUserQuery } from './api';
import FullPageLoader from '@/components/common/FullPageLoader';
import { Navigate } from 'react-router-dom';

export function CheckAuth() {
  const { isError, isFetching } = useGetAuthUserQuery();

  return (
    <>
      {isFetching && <FullPageLoader />}
      {isError && <Navigate to="/login" />}
    </>
  );
}

export default CheckAuth;
