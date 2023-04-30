import { Image } from '@mantine/core';

import logo from '@/assets/logo.png';

export function Logo({ width = '160px' }) {
  return <Image src={logo} width={width} />;
}

export default Logo;
