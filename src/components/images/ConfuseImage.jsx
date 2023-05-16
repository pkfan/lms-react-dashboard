import { Image, Stack, Title } from '@mantine/core';
import config from '@/config';

export function ConfuseImage({ message, titleOrder = 4, ...others }) {
  return (
    <Stack align="center" justify="center">
      <Image src={`${config.domainUrl}/storage/images/default/error/confuse.png`} {...others} />
      <Title order={titleOrder}>{message}</Title>
    </Stack>
  );
}

export default ConfuseImage;
