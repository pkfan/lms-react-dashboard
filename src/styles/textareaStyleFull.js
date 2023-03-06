export const textareaStyleFull = (theme) => ({
  margin: '0 16px',
  '& textarea': {
    backgroundColor: theme.colors.lmsLayout[1],
  },
  '& textarea::placeholder': {
    color: theme.colors.lmsLayout[4],
  },
  [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
    margin: '0 32px',
  },
});

export default textareaStyleFull;
