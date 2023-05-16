import config from '@/config';

export function redirectTo(
  path = '/lms/login',
  delaySecond = 3,
  excludePath = [`/lms/forget-password`, `/lms/register`, 'lms/login', `/lms/email/verification`],
) {
  let miliSecond = delaySecond * 1000;

  if (path != window.location.pathname && !excludePath.includes(window.location.pathname)) {
    setTimeout(() => {
      window.location = `${config.frontEndUrl}${path}`;
    }, miliSecond);
  }
}

export default redirectTo;
