import { Button as MantineButton, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { color }) => ({
  button: {
    backgroundImage: `linear-gradient(${theme.colors[color][4]}, ${theme.colors[color][9]})`,
    // transition: 'all 300ms ease-in-out',
    textTransform: 'uppercase',

    '&:hover': {
      backgroundImage: `linear-gradient(${theme.colors[color][9]}, ${theme.colors[color][4]})`,
      // transform: 'scale(1.03)',
    },
  },
}));

export function Button({ children, className, loading, color = 'lmsPrimary', ...others }) {
  const { classes, cx } = useStyles({ color });

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
