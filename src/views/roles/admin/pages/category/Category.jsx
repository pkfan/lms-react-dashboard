import { useState, useEffect } from 'react';
import {
  Title,
  Stack,
  Tabs,
  Badge,
  Box,
  Popover,
  TextInput,
  Group,
  Button as MantineButton,
  Loader,
  Flex,
  Text,
} from '@mantine/core';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import { SiAddthis } from 'react-icons/si';
import { MdVideoSettings } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { ImEye, ImFilter, ImSearch } from 'react-icons/im';
import Paper from '@/components/common/Paper';
import PageTitle from '@/components/common/PageTitle';
import CategoryList from '../../components/category/CategoryList';
import CategoryCard from '../../components/category/CategoryCard';
import { useGetCategoriesQuery } from '../../api';
import { IconX } from '@tabler/icons';
import Overlay from '@/components/common/Overlay';
import queryString from 'query-string';
import NotFoundImage from '@/components/images/NotFoundImage';

export function Category() {
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    const query = location.search;
    const { page, search } = queryString.parse(query);
    if (page) {
      setPage(Number(page));
    }
    if (search) {
      setSearch(search);
    }
  }, []);

  const setPageWithScroll = (page) => {
    window.scroll(0, 0);
    setPage(page);
    console.log('searchQuery', searchQuery);

    const searchQueryObj = { page };
    if (search) {
      searchQueryObj['search'] = search;
    }
    setSearchParams(searchQueryObj);
  };

  const submitSearch = () => {
    if (searchQuery) {
      console.log('searchParams', searchParams);

      setPage(1);
      setSearch(searchQuery);
      setSearchParams({ page: 1, search: searchQuery });
    }
  };
  const getAllCategories = () => {
    setPage(1);
    setSearch('');
    setSearchParams({ page: 1 });
  };

  const {
    isSuccess: isGetCategoriesSuccess,
    isFetching: isGetCategoriesFetching,
    isError: isGetCategoriesError,
    data: getCategoriesData,
    refetch: getCategoriesRefetch,
  } = useGetCategoriesQuery({ page: activePage, search });

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Category Management">
        <Group>
          <Button
            compact
            component={Link}
            to="/dashboard/admin/category/create"
            leftIcon={<SiAddthis size={16} />}
          >
            Add New
          </Button>
        </Group>
      </PageTitle>

      <Paper sx={{ position: 'relative', zIndex: 0, paddingTop: '40px!important', minHeight: 400 }}>
        {/* search   */}
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
          {isGetCategoriesSuccess && (
            <MantineButton
              compact
              sx={(theme) => ({
                height: 40,
                paddingLeft: 8,
                paddingRight: 8,
              })}
              color="lmsLayout"
              variant="transparent"
              onClick={getAllCategories}
            >
              All Category ({getCategoriesData.meta.total})
            </MantineButton>
          )}

          <Popover width={300} trapFocus position="bottom-end" withArrow shadow="md">
            <Popover.Target>
              <MantineButton
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
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="search from categories"
                />
                <Button onClick={submitSearch} variant="lmsSecondary" sx={{ width: '100%' }}>
                  Search
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <MantineButton
            compact
            leftIcon={<FiRefreshCw size={20} />}
            sx={(theme) => ({
              height: 40,
              paddingLeft: 8,
              paddingRight: 8,
              borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
            })}
            color="lmsLayout"
            variant="transparent"
            onClick={getCategoriesRefetch}
          >
            Refresh
          </MantineButton>
        </Box>
        {isGetCategoriesFetching && (
          <>
            <Flex align="center" justify="center" sx={{ position: 'relative', zIndex: 1000 }}>
              <Loader size="md" />
            </Flex>
            <Overlay />
          </>
        )}
        {isGetCategoriesError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>Error to load categories, Please refresh browser.</Text>
          </Flex>
        )}
        {isGetCategoriesSuccess && (
          <CategoryList>
            {getCategoriesData.data.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                getCategoriesRefetch={getCategoriesRefetch}
              />
            ))}
            {getCategoriesData.data.length <= 0 && (
              <NotFoundImage width={450} message="Category Not Found" />
            )}
          </CategoryList>
        )}
        {isGetCategoriesSuccess && getCategoriesData.meta.last_page > 1 && (
          <Pagination
            total={getCategoriesData.meta.last_page}
            activePage={activePage}
            setPage={setPageWithScroll}
          />
        )}
      </Paper>
    </Stack>
  );
}

export default Category;
