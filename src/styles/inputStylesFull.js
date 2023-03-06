export const inputStylesFull = (theme) => ({
  margin: '0 16px',
  '& input': {
    backgroundColor: theme.colors.lmsLayout[1],
  },
  '& input::placeholder': {
    color: theme.colors.lmsLayout[4],
  },
  [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
    margin: '0 32px',
  },
});

export default inputStylesFull;
