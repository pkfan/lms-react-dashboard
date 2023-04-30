import { useEffect } from 'react';
import { Box } from '@mantine/core';

import { useNavigate } from 'react-router-dom';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

export function Logout({ name = 'Logout', logout, isLogoutSuccess, isLogoutError }) {
  return <Box onClick={onSubmit}>{name}</Box>;
}

export default Logout;
