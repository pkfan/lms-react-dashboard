import { Image } from '@mantine/core';

import logo from '@/assets/logo.svg';

export function Logo({ width = '45px' }) {
  return <Image src={logo} width={width} />;
}

export default Logo;
