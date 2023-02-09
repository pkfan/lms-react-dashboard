import { Button, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  socialButton: {
    minWidth: '210px',
    transition: 'all 300ms ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
}));

export function SocialAuthButton({
  sx,
  children,
  href = '#',
  variant = 'filled',
  icon,
  loading = false,
}) {
  const { classes, cx } = useStyles();
  return (
    <Button
      className={cx(classes.socialButton, sx)}
      component="a"
      href={href}
      variant={variant}
      leftIcon={icon}
      loading={loading}
      loaderPosition="right"
    >
      {children}
    </Button>
  );
}

export default SocialAuthButton;
