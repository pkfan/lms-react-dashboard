import _ from 'lodash';
import { useState, useEffect } from 'react';
import {
  TextInput,
  Stack,
  Paper,
  NumberInput,
  Flex,
  Title,
  Divider,
  Radio,
  Loader,
  Select,
  Text,
} from '@mantine/core';
import Button from '@/components/common/Button';

import { FaUnlockAlt, FaSave, FaMoneyBillWave, FaDollarSign, FaPercent } from 'react-icons/fa';
import { BsFileFontFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { GoWatch } from 'react-icons/go';
import { GrUnlock, GrLock } from 'react-icons/gr';

import inputStylesFull from '@/styles/inputStylesFull';
import { useForm, isEmail, hasLength } from '@mantine/form';
import SwtichText from '@/components/common/SwitchText';

import { useGetCategoriesWithSubCategoriesQuery } from '@/views/roles/instructor/api';
import { useCreateBasicMutation, useUpdateBasicMutation } from '@/views/roles/instructor/api';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons';

export function Basic({ setNewCourse, course }) {
  // console.log('course basic : ', course);
  const {
    isSuccess: isGetCategoriesWithSubCategoriesSuccess,
    isFetching: isGetCategoriesWithSubCategoriesFetching,
    isError: isGetCategoriesWithSubCategoriesError,
    data: getCategoriesWithSubCategoriesData,
  } = useGetCategoriesWithSubCategoriesQuery();

  const [
    createBasic,
    {
      isLoading: isCreateBasicLoading,
      isSuccess: isCreateBasicSuccess,
      error: createBasicError,
      data: createBasicData,
      isError: isCreateBasicError,
    },
  ] = useCreateBasicMutation();
  const [
    updateBasic,
    {
      isLoading: isUpdateBasicLoading,
      isSuccess: isUpdateBasicSuccess,
      error: updateBasicError,
      isError: isUpdateBasicError,
    },
  ] = useUpdateBasicMutation();

  // console.log('createBasicData : ', createBasicData);

  // set initial values
  const initStudyLevel = course?.study_level ? String(course?.study_level) : '0';
  const initHasDiscount = Boolean(course?.discount);
  const initIsFree = !(Boolean(course?.price_dollar) || Boolean(course?.price_local));

  const [hasDiscount, setHasDiscount] = useState(initHasDiscount);
  const [isFree, setIsFree] = useState(initIsFree);
  const [studyLevel, setStudyLevel] = useState(initStudyLevel);
  const [subCategoryId, setSubCategoryId] = useState(course?.sub_category_id);
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasDripContent, setHasDripContent] = useState(Boolean(course?.drip_content));
  const [hasTimeAccessLimitContent, setHasTimeAccessLimitContent] = useState(
    Boolean(course?.access_days),
  );

  const validate = {
    title: hasLength({ min: 3 }, 'Too short'),
  };

  if (!isFree) {
    validate['price_dollar'] = (value) => (value == null ? 'Please enter course price' : null);
    validate['price_local'] = (value) => (value == null ? 'Please enter course price' : null);
    if (hasDiscount) {
      validate['discount'] = (value) => (value == null ? 'Please enter course discount' : null);
    }
  }
  if (hasTimeAccessLimitContent) {
    validate['access_days'] = (value) =>
      value == null ? 'Please Enter DAYS or disable it.' : null;
  }

  const form = useForm({
    initialValues: {
      title: course?.title || '',
      price_dollar: course?.price_dollar,
      price_local: course?.price_local,
      discount: course?.discount,
      access_days: course?.access_days,
    },

    validate,
  });

  useEffect(() => {
    if (isCreateBasicSuccess) {
      showNotification({
        id: 'createBasicSuccess',
        autoClose: 3000,
        title: 'Course Basic Step Created',
        message: `Course basic step  has been completed.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      setNewCourse(createBasicData.course);
    }
    if (isCreateBasicError) {
      const error = _.isObject(createBasicError.errors)
        ? 'data is invalid.'
        : createBasicError.errors;
      showNotification({
        id: 'createBasicError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isCreateBasicSuccess, isCreateBasicError]);

  useEffect(() => {
    if (isUpdateBasicSuccess) {
      showNotification({
        id: 'updateBasicSuccess',
        autoClose: 3000,
        title: 'Course Basic Step updated',
        message: `Course basic step  has been updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }
    if (isUpdateBasicError) {
      const error = _.isObject(updateBasicError.errors)
        ? 'data is invalid.'
        : updateBasicError.errors;
      showNotification({
        id: 'updateBasicError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateBasicSuccess, isUpdateBasicError]);

  const onSubmitHandle = (values) => {
    setIsSubmit(true);
    if (!subCategoryId) {
      return;
    }
    values['study_level'] = studyLevel;
    values['sub_category_id'] = subCategoryId;

    if (isFree) {
      values['price_dollar'] = null;
      values['price_local'] = null;
      values['discount'] = null;
    }
    if (!hasDiscount) {
      values['discount'] = null;
    }
    if (!hasTimeAccessLimitContent) {
      values['access_days'] = null;
    }
    values['drip_content'] = hasDripContent;

    // register(values);
    console.log(values);

    if (!course?.id) {
      createBasic(values);
    } else {
      values['course_id'] = course.id;
      updateBasic(values);
    }
  };

  const transformCategoriesWithSubCategoriesData = () => {
    const items = [];

    getCategoriesWithSubCategoriesData.forEach((catWithSubCat) => {
      if (catWithSubCat.sub_categories.length <= 0) {
        return;
      }

      // const item = { value: 'rick', label: 'Rick', group: 'Used to be a pickle' };

      catWithSubCat.sub_categories.forEach((subCat) => {
        items.push({ value: subCat.id, label: subCat.name, group: catWithSubCat.name });
      });

      // {
      // "id": 7,
      // "image_id": null,
      // "name": "pkfan8",
      // "description": null,
      // "created_at": "2023-03-01T15:13:18.000000Z",
      // "updated_at": "2023-03-01T15:13:18.000000Z",
      // "sub_categories": [
      //       {
      //         "id": 1,
      //         "name": "pkfan2",
      //         "category_id": 7,
      //         "created_at": "2023-03-01T15:13:27.000000Z",
      //         "updated_at": "2023-03-01T15:13:27.000000Z"
      //       }
      // ]
      // },
    });
    if (items.length <= 0) {
      return [{ value: '1', label: 'Child Category', group: 'Parent Category' }];
    }
    return items;
  };

  return (
    <form onSubmit={form.onSubmit(() => onSubmitHandle(form.values))}>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="end">
          <Button
            type="submit"
            compact
            color="lmsLayout"
            leftIcon={<FaSave size={16} />}
            loading={isCreateBasicLoading || isUpdateBasicLoading}
          >
            save
          </Button>
        </Flex>

        <Stack
          spacing="lg"
          py={16}
          sx={(theme) => ({
            border: `1px solid ${theme.colors.lmsLayout[4]}`,
            borderRadius: 4,
            margin: 8,
          })}
        >
          <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="Course Title"
            name="title"
            icon={<BsFileFontFill size={16} style={{ opacity: 0.7 }} />}
            placeholder="This is amazing course for learners."
            {...form.getInputProps('title')}
          />
          {/* <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="Course Slug"
            name="slug"
            icon={<FaLink size={16} style={{ opacity: 0.7 }} />}
            placeholder="this-is-amazing-course-for-learners"
            {...form.getInputProps('slug')}
          /> */}
          {isGetCategoriesWithSubCategoriesFetching && (
            <Flex align="center" justify="center">
              <Loader size="sm" />
            </Flex>
          )}
          {isGetCategoriesWithSubCategoriesError && (
            <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
              <IconX size={16} />
              <Text>Error to load categories, Please refresh browser.</Text>
            </Flex>
          )}
          {isGetCategoriesWithSubCategoriesSuccess && (
            <Select
              searchable
              nothingFound="No Found"
              dropdownPosition="bottom"
              maxDropdownHeight={400}
              withAsterisk
              sx={inputStylesFull}
              label="Course Category"
              placeholder="select course category"
              error={isSubmit && !subCategoryId && 'Please choose a category for course.'}
              data={transformCategoriesWithSubCategoriesData()}
              icon={<BiCategory size={16} />}
              value={subCategoryId}
              onChange={setSubCategoryId}
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          )}
          <Divider my="sm" variant="dashed" />
          <Flex align="center" gap={24} sx={{ padding: '0 32px' }}>
            <Title order={5}> Is This a free course?</Title>
            <SwtichText onLabel="YES" offLabel="NO" checked={isFree} setChecked={setIsFree} />
          </Flex>
          {!isFree && (
            <>
              <NumberInput
                withAsterisk
                sx={inputStylesFull}
                label="Course International Price"
                description="Create course international price in dollars"
                placeholder="Write Your Course Price"
                defaultValue={null}
                icon={<FaDollarSign size={16} style={{ opacity: 0.7 }} />}
                min={1}
                name="price_dollar"
                {...form.getInputProps('price_dollar')}
              />
              <NumberInput
                withAsterisk
                sx={inputStylesFull}
                label="Course National Price"
                description="Create course national price in local currency of your country."
                placeholder="Write Your Course Price in Dollar"
                defaultValue={null}
                icon={<FaMoneyBillWave size={16} style={{ opacity: 0.7 }} />}
                min={1}
                name="price_local"
                {...form.getInputProps('price_local')}
              />

              <Divider my="sm" variant="dashed" />
              <Flex align="center" gap={24} sx={{ padding: '0 32px' }}>
                <Title order={5}> Do you offer a discount?</Title>
                <SwtichText
                  onLabel="YES"
                  offLabel="NO"
                  checked={hasDiscount}
                  setChecked={setHasDiscount}
                />
              </Flex>
              {hasDiscount && (
                <NumberInput
                  withAsterisk
                  sx={inputStylesFull}
                  label="Course Discount"
                  description="Create Course Discount in percentage"
                  placeholder="Write Your Course Price"
                  defaultValue={null}
                  icon={<FaPercent size={16} style={{ opacity: 0.7 }} />}
                  max={99}
                  min={1}
                  name="discount"
                  {...form.getInputProps('discount')}
                />
              )}
            </>
          )}

          <Divider my="sm" variant="dashed" />
          <Flex align="center" gap={24} sx={{ padding: '0 32px' }}>
            {hasDripContent && <GrLock size={20} style={{ opacity: 0.7 }} />}
            {!hasDripContent && <GrUnlock size={20} style={{ opacity: 0.7 }} />}
            <Title order={5}> Drip/Lock This Course Content</Title>
            <SwtichText
              onLabel="Locked"
              offLabel="Unlocked"
              checked={hasDripContent}
              setChecked={setHasDripContent}
            />
          </Flex>
          <Text px={32}>
            Drip content is the practice of releasing your Course Lessons to your students in parts.
            In other words, student must watch current lecture to unlock next lecture.
          </Text>
          <Divider my="sm" variant="dashed" />

          <Flex align="center" gap={24} sx={{ padding: '0 32px' }}>
            <Title order={5}> Is this course has access (time period) limit?</Title>
            <SwtichText
              onLabel="YES"
              offLabel="NO"
              checked={hasTimeAccessLimitContent}
              setChecked={setHasTimeAccessLimitContent}
            />
          </Flex>
          {hasTimeAccessLimitContent && (
            <NumberInput
              withAsterisk
              sx={inputStylesFull}
              label="Course Time/Access Period Limit in DAYS"
              description="Course Access time is the period limit in which student must finish his/her course, otherwise course will be locked/expired."
              placeholder="DAYS for course access time."
              defaultValue={null}
              icon={<GoWatch size={16} />}
              min={1}
              name="access_days"
              {...form.getInputProps('access_days')}
            />
          )}

          <Divider my="sm" variant="dashed" />

          <Radio.Group
            value={studyLevel}
            onChange={setStudyLevel}
            name="study_level"
            label="Studey Level"
            size="md"
            withAsterisk
            sx={inputStylesFull}
          >
            <Radio value="0" label="All" />
            <Radio value="1" label="Beginner" />
            <Radio value="2" label="Intermediate" />
            <Radio value="3" label="Advance" />
          </Radio.Group>
          <Flex w="100%" align="center" justify="center" py={32}>
            <Button
              type="submit"
              color="lmsLayout"
              leftIcon={<FaSave size={16} />}
              loading={isCreateBasicLoading || isUpdateBasicLoading}
            >
              save
            </Button>
          </Flex>
        </Stack>
      </Paper>
    </form>
  );
}

export default Basic;
