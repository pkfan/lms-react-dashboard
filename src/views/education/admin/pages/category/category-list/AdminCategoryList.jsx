import _ from 'lodash';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Title,
  Stack,
  Box,
  Popover,
  TextInput,
  Group,
  Button as MantineButton,
  Loader,
  Flex,
  Text,
  Image,
  Menu,
  ActionIcon,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { formatDistance } from 'date-fns';

import {
  Button,
  RightDrawer,
  Paper,
  PageTitle,
  ConfuseImage,
  ReactDataTable,
  StarsRating,
  DeleteModal,
  ConfirmPasswordModal,
} from '@/components';

import {
  getImageUrl,
  getDimensionImageUrl,
  liveStatusAndColor,
  statusAndColor,
  randomNumber,
} from '@/helpers';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { Query } from '@/lib/cogent-js';
import { CourseInstructorLiveStatus, CourseInstructorStatus } from '@/enums';

import {
  useGetCategoriesQuery,
  useCourseActionMutation,
  useDeleteCategoryMutation,
  useCoursesBulkActionMutation,
  useDeleteBulkCategoryMutation,
} from '@/views/education/admin/api';

import { useSelector } from 'react-redux';

import {
  SiAddthis,
  ImFilter,
  ImSearch,
  ImEye,
  ImEyeBlocked,
  IconDotsVertical,
  IconCheck,
  IconX,
  FaEdit,
  FaChevronDown,
  FiTrash2,
  RiDraftLine,
} from '@/components/icons';
import { usePermissions } from '@/hooks';

import AdminCategoryFilter from './AdminCategoryFilter';
import AdminCategoryDetailCards from './AdminCategoryDetailCards';

export function AdminCategoryList() {
  const { hasPermission } = usePermissions();

  const [categoryName, setCategoryName] = useState('');
  const [categoryCreated, setCategoryCreated] = useState(null);
  const [categoryUpdated, setCategoryUpdated] = useState(null);
  const [categorySortField, setCategorySortField] = useState(null);
  const [categorySortSymbol, setCategorySortSymbol] = useState('-');

  const [submitFilter, setSubmitFilter] = useState(null);

  const [searchPopoverOpened, setSearchPopoverOpened] = useState(false);

  const [requestCategoryId, setRequestCategoryId] = useState(null);

  const [selectedCategory, setselectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [openedRightFilter, { open: openRightFilter, close: closeRightFilter }] =
    useDisclosure(false);

  ///////////
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [openedBulkDeleteModal, { open: openBulkDeleteModal, close: closeBulkDeleteModal }] =
    useDisclosure(false);
  // confirm password
  const isPasswordConfirm = useSelector((state) => state.authSlice.auth.isPasswordConfirm);

  const [
    openedConfirmPasswordModal,
    { open: openConfirmPasswordModal, close: closeConfirmPasswordModal },
  ] = useDisclosure(false);

  // delete category
  const [
    deleteCategory,
    {
      isSuccess: isDeleteCategorySuccess,
      isLoading: isDeleteCategoryLoading,
      isError: isDeleteCategoryError,
      error: deleteCategoryError,
      // data: deleteCategoryData,
    },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isDeleteCategorySuccess) {
      closeDeleteModal();
      setselectedCategory(null);
      showNotification({
        id: 'deleteCategorySuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Category has been deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteCategoryError) {
      closeDeleteModal();
      const error = _.isObject(deleteCategoryError.errors)
        ? 'data is invalid.'
        : deleteCategoryError.errors;
      showNotification({
        id: 'deleteCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteCategorySuccess, isDeleteCategoryError]);

  const deleteActionWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openDeleteModal();
    }
  };

  const confirmDelete = () => {
    deleteCategory({ category_id: requestCategoryId });
  };

  //bulk category delete
  const [
    deleteBulkCategory,
    {
      isSuccess: isDeleteBulkCategorySuccess,
      isLoading: isDeleteBulkCategoryLoading,
      isError: isDeleteBulkCategoryError,
      error: deleteBulkCategoryError,
      // data: DeleteBulkCategoryData,
    },
  ] = useDeleteBulkCategoryMutation();

  useEffect(() => {
    if (isDeleteBulkCategorySuccess) {
      closeBulkDeleteModal();
      setselectedCategory(null);
      showNotification({
        id: 'deleteBulkCategorySuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Bulk Categories have been deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteBulkCategoryError) {
      closeBulkDeleteModal();
      const error = _.isObject(deleteBulkCategoryError.errors)
        ? 'data is invalid.'
        : deleteBulkCategoryError.errors;
      showNotification({
        id: 'deleteBulkCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteBulkCategorySuccess, isDeleteBulkCategoryError]);

  const deleteBulkCategoryWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openBulkDeleteModal();
    }
  };

  const confirmBulkDelete = () => {
    deleteBulkCategory({
      category_ids: selectedCategory.map((selectedCategory) => selectedCategory.id),
    });
  };

  //////////////

  const columns = useMemo(() => [
    {
      name: 'Action',
      selector: (row) => (
        <Box>
          <Menu shadow="md" position="right" offset={-5} withArrow arrowPosition="center">
            <Menu.Target>
              <ActionIcon
                loading={row.id == requestCategoryId && isDeleteCategoryLoading}
                sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
              >
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {hasPermission('edit category', 'admin') && (
                <Menu.Item
                  icon={<FaEdit size={14} style={{ opacity: 0.6 }} />}
                  component={Link}
                  to={`/dashboard/admin/categories/${row.id}/edit`}
                >
                  Edit
                </Menu.Item>
              )}
              {hasPermission('delete category', 'admin') && (
                <Menu.Item
                  color="red"
                  icon={<FiTrash2 size={14} />}
                  onClick={() => {
                    setRequestCategoryId(row.id);
                    deleteActionWrapper();
                  }}
                >
                  Delete
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Box>
      ),
      // sortable: true,
      maxWidth: '40px',
      minWidth: '40px',
      compact: true,
    },

    {
      name: 'Thumbnail',
      selector: (row) => (
        <Image
          src={row.image ? getImageUrl(row.image) : getDimensionImageUrl({ dimension: '400X400' })}
          width="100%"
          p={8}
          radius="md"
        />
      ),
      maxWidth: '180px',
      minWidth: '180px',
    },
    {
      name: 'Category',
      selector: (row) => row.name,
      // sortable: true,
      maxWidth: '250px',
      minWidth: '250px',
    },
    {
      name: 'Sub Categories',
      selector: (row) => row.sub_categories_count,
      // sortable: true,
      maxWidth: '110px',
      minWidth: '110px',
      compact: true,
    },
    {
      name: 'Created',
      selector: (row) =>
        formatDistance(new Date(row.created_at), new Date(), {
          addSuffix: true,
        }),
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
    {
      name: 'Updated',
      selector: (row) =>
        formatDistance(new Date(row.updated_at), new Date(), {
          addSuffix: true,
        }),
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
  ]);

  const generateUrlQuery = useCallback(() => {
    // /api/categories?fields[categories]=id,name,description,image_id,created_at,updated_at&include=thumbnail,subCategoriesCount,subCategories&sort=-name,created_at&page=1&rowsPerPage=50&paginate=true

    const query = new Query();
    let urlQuery = query.for('admin/categories'); // the model you're selecting
    // .where('title', 'me')

    if (categoryName) {
      urlQuery = urlQuery.where('name', categoryName); // where the models `name` is 'Bob'
    }
    if (categoryCreated) {
      urlQuery = urlQuery.where('created', categoryCreated);
    }
    if (categoryUpdated) {
      urlQuery = urlQuery.where('updated', categoryUpdated);
    }

    // sort
    if (categorySortField) {
      let symbol = categorySortSymbol == '-' ? '-' : '';

      urlQuery = urlQuery.sort(`${symbol}${categorySortField}`);
    } else {
      urlQuery = urlQuery.sort('-updated_at');
    }

    urlQuery.includes('subCategoriesCount', 'thumbnail').page(currentPage).params({
      rowsPerPage,
      paginate: 'true',
      'fields[categories]': `id,name,image_id,created_at,updated_at`,
    });

    urlQuery = urlQuery.get();

    console.log('Query urlQuery::::: ', urlQuery);
    // alert('app loaded');

    return urlQuery;
  }, [currentPage, rowsPerPage, submitFilter]);

  const {
    isSuccess: isGetCategoriesSuccess,
    isFetching: isGetCategoriesFetching,
    isError: isGetCategoriesError,
    data: categoriesWithDetailData,
  } = useGetCategoriesQuery({ url: generateUrlQuery(), submitFilter }); //force to refetch

  console.log('categoriesWithDetailData ======== : ', categoriesWithDetailData);

  const handlePageChange = (page) => {
    // console.log('handlePageChange', page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = (rows, page) => {
    // console.log('handlePerRowsChange', rows, page);
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const submitFilterWrapper = () => {
    setSubmitFilter(randomNumber());
    closeRightFilter();
    setCurrentPage(1);
    setselectedCategory(null);
  };

  const submitSearch = () => {
    setSubmitFilter(randomNumber());
    setCurrentPage(1);
    setSearchPopoverOpened(false);
    setselectedCategory(null);
  };

  const clear = () => {
    setCategoryName('');
    setCategoryCreated(null);
    setCategoryUpdated(null);
    setCategorySortField(null);
    setselectedCategory(null);
  };

  const submitViaCard = (type = 'total') => {
    clear();
    submitFilterWrapper();
  };

  return (
    <>
      <Stack sx={{ width: '100%' }}>
        {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

        <PageTitle title="Category Management">
          <Group>
            <Button compact component={Link} to="#" leftIcon={<SiAddthis size={16} />}>
              Add New
            </Button>
          </Group>
        </PageTitle>

        <AdminCategoryDetailCards submitViaCard={submitViaCard} />

        <Paper
          sx={{ position: 'relative', zIndex: 0, paddingTop: '48px!important', minHeight: 400 }}
        >
          {/* action dropdown  */}
          {selectedCategory?.length > 0 && (
            <Flex
              align="center"
              gap={8}
              sx={{
                position: 'absolute',
                left: 16,
                top: 8,
              }}
            >
              <Box>
                <Menu shadow="md">
                  <Menu.Target>
                    <MantineButton
                      compact
                      sx={(theme) => ({
                        backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                        textTransform: 'uppercase',

                        '&:hover': {
                          backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                        },
                      })}
                      variant="outline"
                      component="div"
                      color="lmsLayout"
                      rightIcon={<FaChevronDown size={14} />}
                    >
                      Bulk Actions
                    </MantineButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Divider />
                    {hasPermission('delete category', 'admin') && (
                      <Menu.Item
                        color="red"
                        icon={<FiTrash2 size={14} />}
                        onClick={deleteBulkCategoryWrapper}
                      >
                        Delete All
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Box>

              <Title order={5}>Total {selectedCategory.length} categories selected.</Title>
            </Flex>
          )}
          <Box
            sx={{
              position: 'absolute',
              right: 16,
              top: 8,
              width: 300,
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            {/* search  */}
            <Popover
              opened={searchPopoverOpened}
              onChange={setSearchPopoverOpened}
              width={300}
              trapFocus
              position="bottom-end"
              withArrow
              shadow="md"
            >
              <Popover.Target>
                <MantineButton
                  onClick={() => {
                    setSearchPopoverOpened(true);
                    clear();
                  }}
                  compact
                  sx={(theme) => ({
                    height: 40,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
                  })}
                  leftIcon={<ImSearch size={16} />}
                  color="lmsLayout"
                  variant="transparent"
                >
                  Search
                </MantineButton>
              </Popover.Target>
              <Popover.Dropdown
                sx={(theme) => ({
                  background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                })}
              >
                <Stack>
                  <TextInput
                    onChange={(event) => setCategoryName(event.target.value)}
                    placeholder="search courses"
                  />
                  <Button onClick={submitSearch} variant="lmsSecondary" sx={{ width: '100%' }}>
                    Search
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
            {/* filter  */}
            <MantineButton
              compact
              leftIcon={<ImFilter size={20} />}
              sx={(theme) => ({
                height: 40,
                paddingLeft: 8,
                paddingRight: 8,
                borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
              })}
              color="lmsLayout"
              variant="transparent"
              onClick={openRightFilter}
            >
              Filter
            </MantineButton>
          </Box>
          {isGetCategoriesFetching && (
            <Stack justify="center" align="center" sx={{ padding: 24, width: '100%' }}>
              <Loader size="md" my={50} />
            </Stack>
          )}
          {isGetCategoriesError && (
            <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
              <IconX size={16} />
              <Text>Error to load, Please refresh browser.</Text>
            </Flex>
          )}
          {isGetCategoriesSuccess && categoriesWithDetailData.data.length <= 0 && (
            <Stack justify="center" align="center" sx={{ width: '100%' }}>
              <ConfuseImage width={450} message="" />
            </Stack>
          )}
          {/* {isGetCategoriesSuccess && categoriesWithDetailData.data.length > 0 && ( */}
          <ReactDataTable
            columns={columns}
            data={categoriesWithDetailData?.data}
            keyField="id"
            fixedHeader
            highlightOnHover
            responsive
            selectableRows
            selectableRowsHighlight
            progressPending={isGetCategoriesFetching}
            ////////
            pagination
            paginationServer
            paginationTotalRows={categoriesWithDetailData?.meta.total || 0}
            paginationDefaultPage={currentPage}
            paginationPerPage={50}
            paginationRowsPerPageOptions={[50, 75, 100, 150, 200]}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            onSelectedRowsChange={({ selectedRows }) => setselectedCategory(selectedRows)}
          />
          {/* )} */}
        </Paper>
      </Stack>
      {/* filter right sidebar  */}
      <RightDrawer title="" size="lg" opened={openedRightFilter} onClose={closeRightFilter}>
        <AdminCategoryFilter
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          categoryCreated={categoryCreated}
          setCategoryCreated={setCategoryCreated}
          categoryUpdated={categoryUpdated}
          setCategoryUpdated={setCategoryUpdated}
          categorySortField={categorySortField}
          setCategorySortField={setCategorySortField}
          categorySortSymbol={categorySortSymbol}
          setCategorySortSymbol={setCategorySortSymbol}
          submitFilterWrapper={submitFilterWrapper}
          clear={clear}
        />
      </RightDrawer>
      <ConfirmPasswordModal opened={openedConfirmPasswordModal} close={closeConfirmPasswordModal} />
      <DeleteModal
        title="Delete Category"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteCategoryLoading}
      >
        <Text>Are you sure to delete?</Text>
      </DeleteModal>
      <DeleteModal
        title="Delete All Categories"
        opened={openedBulkDeleteModal}
        confirm={confirmBulkDelete}
        close={closeBulkDeleteModal}
        isDeleting={isDeleteBulkCategoryLoading}
      >
        <Text>Are you sure to delete?</Text>
      </DeleteModal>
    </>
  );
}

export default AdminCategoryList;
