import { Button as MantineButton, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { variant }) => ({
  button: {
    backgroundImage: `linear-gradient(${theme.colors[variant][4]}, ${theme.colors[variant][9]})`,
    // transition: 'all 300ms ease-in-out',
    textTransform: 'uppercase',

    '&:hover': {
      backgroundImage: `linear-gradient(${theme.colors[variant][9]}, ${theme.colors[variant][4]})`,
      // transform: 'scale(1.03)',
    },
  },
}));

export function Button({ children, className, loading, variant = 'lmsPrimary', ...others }) {
  const { classes, cx } = useStyles({ variant });

  return (
    <MantineButton
      className={cx(classes.button, className)}
      loading={loading}
      loaderPosition="right"
      {...others}
    >
      {children}
    </MantineButton>
  );
}

export default Button;
