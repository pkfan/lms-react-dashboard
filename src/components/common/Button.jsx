import { Button as MantineButton, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundImage: `linear-gradient(${theme.colors.lmsPrimary[4]}, ${theme.colors.lmsPrimary[9]})`,
    transition: 'all 300ms ease-in-out',

    '&:hover': {
      backgroundImage: `linear-gradient(${theme.colors.lmsPrimary[9]}, ${theme.colors.lmsPrimary[4]})`,
      transform: 'scale(1.03)',
    },
  },
}));

export function Button({ children, className, loading, ...others }) {
  const { classes, cx } = useStyles();

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
