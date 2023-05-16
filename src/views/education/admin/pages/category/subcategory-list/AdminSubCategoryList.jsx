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
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
  useDeleteBulkSubCategoryMutation,
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

import AdminSubCategoryFilter from './AdminSubCategoryFilter';
import AdminSubCategoryDetailCards from './AdminSubCategoryDetailCards';

export function AdminSubCategoryList() {
  const { hasPermission } = usePermissions();

  const [subCategoryName, setSubCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryCreated, setSubCategoryCreated] = useState(null);
  const [subCategoryUpdated, setSubCategoryUpdated] = useState(null);
  const [subCategorySortField, setSubCategorySortField] = useState(null);
  const [subCategorySortSymbol, setSubCategorySortSymbol] = useState('-');

  const [submitFilter, setSubmitFilter] = useState(null);

  const [searchPopoverOpened, setSearchPopoverOpened] = useState(false);

  const [requestSubCategoryId, setRequestSubCategoryId] = useState(null);

  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
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
    deleteSubCategory,
    {
      isSuccess: isDeleteSubCategorySuccess,
      isLoading: isDeleteSubCategoryLoading,
      isError: isDeleteSubCategoryError,
      error: deleteSubCategoryError,
      // data: deleteSubCategoryData,
    },
  ] = useDeleteSubCategoryMutation();

  useEffect(() => {
    if (isDeleteSubCategorySuccess) {
      closeDeleteModal();
      setSelectedSubCategories(null);
      showNotification({
        id: 'deleteSubCategorySuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Sub Category has been deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteSubCategoryError) {
      closeDeleteModal();
      const error = _.isObject(deleteSubCategoryError.errors)
        ? 'data is invalid.'
        : deleteSubCategoryError.errors;
      showNotification({
        id: 'deleteSubCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteSubCategorySuccess, isDeleteSubCategoryError]);

  const deleteActionWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openDeleteModal();
    }
  };

  const confirmDelete = () => {
    deleteSubCategory({ subcategory_id: requestSubCategoryId });
  };

  //bulk category delete
  const [
    deleteBulkSubCategory,
    {
      isSuccess: isDeleteBulkSubCategorySuccess,
      isLoading: isDeleteBulkSubCategoryLoading,
      isError: isDeleteBulkSubCategoryError,
      error: deleteBulkSubCategoryError,
      // data: DeleteBulkSubCategoryData,
    },
  ] = useDeleteBulkSubCategoryMutation();

  useEffect(() => {
    if (isDeleteBulkSubCategorySuccess) {
      closeBulkDeleteModal();
      setSelectedSubCategories(null);
      showNotification({
        id: 'deleteBulkSubCategorySuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Bulk Sub Categories have been deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteBulkSubCategoryError) {
      closeBulkDeleteModal();
      const error = _.isObject(deleteBulkSubCategoryError.errors)
        ? 'data is invalid.'
        : deleteBulkSubCategoryError.errors;
      showNotification({
        id: 'deleteBulkSubCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteBulkSubCategorySuccess, isDeleteBulkSubCategoryError]);

  const deleteBulkSubCategoryWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openBulkDeleteModal();
    }
  };

  const confirmBulkDelete = () => {
    deleteBulkSubCategory({
      subcategory_ids: selectedSubCategories.map((selectedSubCategory) => selectedSubCategory.id),
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
                loading={row.id == requestSubCategoryId && isDeleteSubCategoryLoading}
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
                  to={`/dashboard/admin/subcategories/${row.id}/edit`}
                >
                  Edit
                </Menu.Item>
              )}
              {hasPermission('delete category', 'admin') && (
                <Menu.Item
                  color="red"
                  icon={<FiTrash2 size={14} />}
                  onClick={() => {
                    setRequestSubCategoryId(row.id);
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
      maxWidth: '60px',
      minWidth: '60px',
      compact: true,
    },
    {
      name: 'Sub Category',
      selector: (row) => row.name,
      // sortable: true,
      maxWidth: '200px',
      minWidth: '200px',
      compact: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category.name,
      // sortable: true,
      maxWidth: '200px',
      minWidth: '200px',
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
    let urlQuery = query.for('admin/subcategories'); // the model you're selecting
    // .where('title', 'me')

    if (subCategoryName) {
      urlQuery = urlQuery.where('name', subCategoryName); // where the models `name` is 'Bob'
    }
    if (categoryId) {
      urlQuery = urlQuery.where('categoryId', categoryId); // where the models `name` is 'Bob'
    }
    if (subCategoryCreated) {
      urlQuery = urlQuery.where('created', subCategoryCreated);
    }
    if (subCategoryUpdated) {
      urlQuery = urlQuery.where('updated', subCategoryUpdated);
    }

    // sort
    if (subCategorySortField) {
      let symbol = subCategorySortSymbol == '-' ? '-' : '';

      urlQuery = urlQuery.sort(`${symbol}${subCategorySortField}`);
    } else {
      urlQuery = urlQuery.sort('-updated_at');
    }

    urlQuery.includes('category').page(currentPage).params({
      rowsPerPage,
      paginate: 'true',
      'fields[sub_categories]': `id,name,category_id,created_at,updated_at`,
    });

    urlQuery = urlQuery.get();

    console.log('Query urlQuery::::: ', urlQuery);
    // alert('app loaded');

    return urlQuery;
  }, [currentPage, rowsPerPage, submitFilter]);

  const {
    isSuccess: isGetSubCategoriesSuccess,
    isFetching: isGetSubCategoriesFetching,
    isError: isGetSubCategoriesError,
    error: errorSubcategories,
    data: subcategoriesWithDetailData,
  } = useGetSubCategoriesQuery({ url: generateUrlQuery(), submitFilter }); //force to refetch

  console.log('subcategoriesWithDetailData ======== : ', subcategoriesWithDetailData);
  console.log('errorSubcategories ======== : ', errorSubcategories);

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
    setSelectedSubCategories(null);
  };

  const submitSearch = () => {
    setSubmitFilter(randomNumber());
    setCurrentPage(1);
    setSearchPopoverOpened(false);
    setSelectedSubCategories(null);
  };

  const clear = () => {
    setSubCategoryName('');
    setCategoryId(null);
    setSubCategoryCreated(null);
    setSubCategoryUpdated(null);
    setSubCategorySortField(null);
    setSelectedSubCategories(null);
  };

  const submitViaCard = (type = 'total') => {
    clear();
    submitFilterWrapper();
  };

  return (
    <>
      <Stack sx={{ width: '100%' }}>
        {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

        <PageTitle title="Sub Category Management">
          <Group>
            <Button compact component={Link} to="#" leftIcon={<SiAddthis size={16} />}>
              Add New
            </Button>
          </Group>
        </PageTitle>

        <AdminSubCategoryDetailCards submitViaCard={submitViaCard} />

        <Paper
          sx={{ position: 'relative', zIndex: 0, paddingTop: '48px!important', minHeight: 400 }}
        >
          {/* action dropdown  */}
          {selectedSubCategories?.length > 0 && (
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
                        onClick={deleteBulkSubCategoryWrapper}
                      >
                        Delete All
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Box>

              <Title order={5}>Total {selectedSubCategories.length} sub categories selected.</Title>
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
                    onChange={(event) => setSubCategoryName(event.target.value)}
                    placeholder="search"
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
          {isGetSubCategoriesFetching && (
            <Stack justify="center" align="center" sx={{ padding: 24, width: '100%' }}>
              <Loader size="md" my={50} />
            </Stack>
          )}
          {isGetSubCategoriesError && (
            <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
              <IconX size={16} />
              <Text>Error to load, Please refresh browser.</Text>
            </Flex>
          )}
          {isGetSubCategoriesSuccess && subcategoriesWithDetailData.data.length <= 0 && (
            <Stack justify="center" align="center" sx={{ width: '100%' }}>
              <ConfuseImage width={450} message="" />
            </Stack>
          )}
          {/* {isGetSubCategoriesSuccess && subcategoriesWithDetailData.data.length > 0 && ( */}
          <ReactDataTable
            columns={columns}
            data={subcategoriesWithDetailData?.data}
            keyField="id"
            fixedHeader
            highlightOnHover
            responsive
            selectableRows
            selectableRowsHighlight
            progressPending={isGetSubCategoriesFetching}
            ////////
            pagination
            paginationServer
            paginationTotalRows={subcategoriesWithDetailData?.meta.total || 0}
            paginationDefaultPage={currentPage}
            paginationPerPage={50}
            paginationRowsPerPageOptions={[50, 75, 100, 150, 200]}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            onSelectedRowsChange={({ selectedRows }) => setSelectedSubCategories(selectedRows)}
          />
          {/* )} */}
        </Paper>
      </Stack>
      {/* filter right sidebar  */}
      <RightDrawer title="" size="lg" opened={openedRightFilter} onClose={closeRightFilter}>
        <AdminSubCategoryFilter
          subCategoryName={subCategoryName}
          setSubCategoryName={setSubCategoryName}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          subCategoryCreated={subCategoryCreated}
          setSubCategoryCreated={setSubCategoryCreated}
          subCategoryUpdated={subCategoryUpdated}
          setSubCategoryUpdated={setSubCategoryUpdated}
          subCategorySortField={subCategorySortField}
          setSubCategorySortField={setSubCategorySortField}
          subCategorySortSymbol={subCategorySortSymbol}
          setSubCategorySortSymbol={setSubCategorySortSymbol}
          submitFilterWrapper={submitFilterWrapper}
          clear={clear}
        />
      </RightDrawer>
      <ConfirmPasswordModal opened={openedConfirmPasswordModal} close={closeConfirmPasswordModal} />
      <DeleteModal
        title="Delete Sub Category"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteSubCategoryLoading}
      >
        <Text>Are you sure to delete?</Text>
      </DeleteModal>
      <DeleteModal
        title="Delete All Sub Categories"
        opened={openedBulkDeleteModal}
        confirm={confirmBulkDelete}
        close={closeBulkDeleteModal}
        isDeleting={isDeleteBulkSubCategoryLoading}
      >
        <Text>Are you sure to delete?</Text>
      </DeleteModal>
    </>
  );
}

export default AdminSubCategoryList;
