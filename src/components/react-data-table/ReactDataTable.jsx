import DataTable, { createTheme } from 'react-data-table-component';
import { Box, Loader } from '@mantine/core';

createTheme(
  'lmsTableTheme',
  {
    text: {
      primary: 'var(--lmsLayout-1)',
      secondary: 'var(--lmsLayout-3)',
    },
    background: {
      default: 'var(--skin-0)',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: 'var(--lmsLayout-3)',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'light',
);

export default function ReactDataTable({ ...others }) {
  const pageDirection = document.querySelector('html').getAttribute('dir');

  return (
    <Box
      sx={(theme) => ({
        padding: '24px 0',
        width: '100%',

        '& .rdt_TableBody [role="row"]': {
          background: `${theme.colors.lmsSkin[0]}`,
          color: `${theme.colors.lmsSkin[1]}`,
        },
        '& .rdt_TableBody [role="row"]:hover': {
          background: `${theme.colors.lmsLayout[2]}`,
          color: `${theme.colors.lmsLayout[7]}`,
        },
        '& .rdt_Pagination button svg': {
          fill: `${theme.colors.lmsLayout[7]}`,
        },
        '& .rdt_Pagination button[disabled] svg': {
          fill: `${theme.colors.lmsLayout[3]}`,
        },
        '& .rdt_TableRow:not(:last-of-type)': {
          borderBottom: `1px solid ${theme.colors.lmsLayout[3]}`,
        },
        '& .rdt_TableHeadRow': {
          borderBottom: `1px solid ${theme.colors.lmsLayout[3]}`,
        },
        '& .rdt_Pagination': {
          borderTop: `1px solid ${theme.colors.lmsLayout[3]}`,
        },
      })}
    >
      <DataTable
        theme="lmsTableTheme"
        className="react-data-table"
        // columns={columns}
        // data={courses?.data}
        // keyField="id"

        // selectableRows
        // expandableRowsComponent={ExpandedComponent}
        direction={pageDirection ? pageDirection : 'ltr'}
        fixedHeader
        // fixedHeaderScrollHeight='88vh'
        highlightOnHover
        responsive
        // selectableRows
        // selectableRowsHighlight
        // striped
        // subHeader
        // subHeaderAlign="right"
        // subHeaderWrap
        // progressPending={isFetching}
        // progressComponent={<Loader size="md" my={150} />}
        // persistTableHead
        ////////
        // pagination
        // paginationServer
        // paginationTotalRows={courses?.meta.total || 0}
        // paginationDefaultPage={currentPage}
        // paginationPerPage={50}
        // paginationRowsPerPageOptions={[50, 75, 100, 150, 200]}
        // onChangeRowsPerPage={handlePerRowsChange}
        // onChangePage={handlePageChange}
        // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        {...others}
      />
    </Box>
  );
}
