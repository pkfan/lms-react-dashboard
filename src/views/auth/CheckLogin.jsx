import { useGetAuthUserQuery } from './api';
// import { store } from '@/store';
import { Navigate } from 'react-router-dom';
import FullPageLoader from '@/components/common/FullPageLoader';

export function CheckLogin() {
  const { isError, isSuccess, isFetching, data, error } = useGetAuthUserQuery();

  console.log('isSuccess', isSuccess);
  console.log('isFetching', isFetching);
  console.log('isError', isError);
  console.log('data', data);
  console.log('error', error);
  // console.log('store === : ', store.getState());

  return (
    <>
      {isFetching && <FullPageLoader />}
      {isSuccess && <Navigate to="/admin/dashboard" />}
    </>
  );
}

export default CheckLogin;
