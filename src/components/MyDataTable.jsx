import { useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Box, Image, Text, Loader } from '@mantine/core';
import { useGetCoursesTestQuery } from '@/api/base';
import StarsRating from '@/components/StarsRating';
import getImageUrl from '@/helpers/getImageUrl';
import getDimensionImageUrl from '@/helpers/image/getDimensionImageUrl';

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

export default function CourseInviteInstructors() {
  const pageDirection = document.querySelector('html').getAttribute('dir');

  const { data: courses, error, isFetching, isSuccess, isError } = useGetCoursesTestQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const columns = useMemo(
    () => [
      // {
      //   name: 'No',
      //   selector: (row) => row.id,
      // sortable: true,
      //   maxWidth: '50px',
      //   minWidth: '50px',
      //   compact: true,
      // },
      {
        name: 'Thumbnail',
        selector: (row) => (
          <Image
            src={row.thumbnail ? getImageUrl(row.thumbnail) : getDimensionImageUrl('640X360')}
            width={80}
            py={8}
          />
        ),
        maxWidth: '100px',
        minWidth: '100px',
      },
      {
        name: 'Title',
        selector: (row) => row.title,
        // sortable: true,
        maxWidth: '350px',
        minWidth: '350px',
      },
      {
        name: 'Instructors',
        selector: (row) =>
          row.instructors.map((instructor) => (
            <Text key={instructor.id}>{instructor.full_name}</Text>
          )),
        // sortable: true,
        maxWidth: '150px',
        minWidth: '150px',
      },
      {
        name: 'Price',
        selector: (row) => (row.price ? `Rs ${row.price}` : 'FREE'),
        // sortable: true,
        maxWidth: '100px',
        minWidth: '100px',
        compact: true,
      },

      {
        name: 'Discount Price',
        selector: (row) => {
          const PERCENTAGE = 100;
          const discountPrice = ((PERCENTAGE - row.discount) / PERCENTAGE) * row.price;
          return row.discount ? `Rs ${discountPrice.toFixed(2)}` : 'Free';
        },
        // sortable: true,
        maxWidth: '100px',
        minWidth: '100px',
        compact: true,
      },
      {
        name: 'Discount',
        selector: (row) => (row.discount ? row.discount : 0),
        // sortable: true,
        maxWidth: '80px',
        minWidth: '80px',
        compact: true,
      },

      {
        name: 'Access Days',
        selector: (row) => (row.access_days ? row.access_days : 'unlimited'),
        // sortable: true,
        maxWidth: '80px',
        minWidth: '80px',
        compact: true,
      },
      {
        name: 'Stars',
        selector: (row) => <StarsRating stars={row.stars} />,
        // sortable: true,
        maxWidth: '90px',
        minWidth: '90px',
        compact: true,
      },
      {
        name: 'Comments',
        selector: (row) => row.comments,
        // sortable: true,
        maxWidth: '100px',
        minWidth: '100px',
        compact: true,
      },
    ],
    [],
  );

  const handlePageChange = (page) => {
    console.log('handlePageChange', page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log('handlePerRowsChange', newPerPage, page);
  };

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
        columns={columns}
        data={courses?.data}
        keyField="id"
        // selectableRows
        // expandableRowsComponent={ExpandedComponent}
        direction={pageDirection ? pageDirection : 'ltr'}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        responsive
        selectableRows
        selectableRowsHighlight
        // striped
        // subHeader
        // subHeaderAlign="right"
        // subHeaderWrap
        progressPending={isFetching}
        progressComponent={<Loader size="md" my={150} />}
        persistTableHead
        ////////
        // pagination
        pagination
        paginationServer
        paginationTotalRows={courses?.meta.total || 0}
        paginationDefaultPage={currentPage}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[50, 75, 100, 150, 200]}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
      />
    </Box>
  );
}
