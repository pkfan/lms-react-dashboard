import { Button } from '@mantine/core';

export function ButtonWhite({ children, ...others }) {
  return (
    <Button
      sx={(theme) => ({
        backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

        textTransform: 'uppercase',

        '&:hover': {
          backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
        },
      })}
      variant="outline"
      // component="div"
      color="lmsLayout"
      {...others}
    >
      {children}
    </Button>
  );
}

export default ButtonWhite;
