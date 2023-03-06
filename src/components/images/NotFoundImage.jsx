import { Image, Stack, Title } from '@mantine/core';
import config from '@/config';

export function NotFoundImage({ message, titleOrder = 4, ...others }) {
  return (
    <Stack align="center" justify="center">
      <Image src={`${config.domainUrl}/storage/images/error/not-found.png`} {...others} />
      <Title order={titleOrder}>{message}</Title>
    </Stack>
  );
}

export default NotFoundImage;
