import { Pagination as MantinePagination } from '@mantine/core';

export function Pagination() {
  return (
    <MantinePagination
      total={10}
      position="center"
      sx={{ margin: '30px 8px' }}
      styles={(theme) => ({
        item: {
          '&[data-active]': {
            backgroundImage: theme.fn.gradient({
              from: theme.colors.lmsPrimary[4],
              to: theme.colors.lmsPrimary[9],
            }),
          },
        },
      })}
    />
  );
}

export default Pagination;
