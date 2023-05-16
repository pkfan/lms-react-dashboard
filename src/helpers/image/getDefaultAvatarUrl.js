import config from '@/config';

export function getDefaultAvatarUrl() {
  return `${config.domainUrl}/storage/images/default/avatar.jpg`;
}

export default getDefaultAvatarUrl;
