export const inputStyles = (theme) => ({
  width: '230px',
  '& input': {
    backgroundColor: theme.colors.lmsLayout[1],
  },
  '& input::placeholder': {
    color: theme.colors.lmsLayout[4],
  },
  [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
    width: '350px',
  },
});

export default inputStyles;
