import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, MdClose } from '@/components/icons';

export const showLoadingNotification = ({ id = 'pkfan', title = 'Loading...', message = '' }) => {
  showNotification({
    id,
    loading: true,
    title,
    message,
    autoClose: false,
    disallowClose: true,
  });
};

export const updateLoadingNotificationSuccess = ({
  id = 'pkfan',
  title = 'Success',
  message = '',
  time = 2000,
}) => {
  updateNotification({
    id,
    color: 'teal',
    title,
    message,
    icon: <IconCheck size={16} />,
    autoClose: time,
  });
};
export const updateLoadingNotificationError = ({
  id = 'pkfan',
  title = 'Failed',
  message = '',
  time = 2000,
}) => {
  updateNotification({
    id,
    color: 'red',
    title,
    message,
    icon: <MdClose size={16} style={{ color: '#fff' }} />,
    autoClose: time,
  });
};
