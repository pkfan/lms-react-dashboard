import { Group, Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

export function Notification() {
  showNotification({
    id: 'load-data',
    loading: true,
    title: 'Loading your data',
    message: 'Data will be loaded in 3 seconds, you cannot close this yet',
    autoClose: false,
    disallowClose: true,
  });

  setTimeout(() => {
    updateNotification({
      id: 'load-data',
      color: 'teal',
      title: 'Data was loaded',
      message: 'Notification will close in 2 seconds, you can close this notification now',
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
  }, 3000);

  return (
    <Group position="center">
      <Button
        variant="outline"
        onClick={() => {
          showNotification({
            id: 'load-data',
            loading: true,
            title: 'Loading your data',
            message: 'Data will be loaded in 3 seconds, you cannot close this yet',
            autoClose: false,
            disallowClose: true,
          });

          setTimeout(() => {
            updateNotification({
              id: 'load-data',
              color: 'teal',
              title: 'Data was loaded',
              message: 'Notification will close in 2 seconds, you can close this notification now',
              icon: <IconCheck size={16} />,
              autoClose: 2000,
            });
          }, 3000);
        }}
      >
        Show update notification
      </Button>
    </Group>
  );
}

export default Notification;
