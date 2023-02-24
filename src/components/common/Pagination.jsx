import { Pagination as MantinePagination } from '@mantine/core';

export function Pagination({ total = 10, activePage, setPage }) {
  return (
    <MantinePagination
      total={total}
      page={activePage}
      onChange={setPage}
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
