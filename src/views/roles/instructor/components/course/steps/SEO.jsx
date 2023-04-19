import { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  TextInput,
  Stack,
  Paper,
  Flex,
  Title,
  Divider,
  Textarea,
  Progress,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Button } from '@/components';
import { inputStylesFull, textareaStyleFull } from '@/styles';
import slugify from 'slugify';
import { useInsertSeoMutation } from '@/views/roles/instructor/api';
import {
  IconCheck,
  IconX,
  FaLink,
  FaSave,
  FaFacebookSquare,
  FaTwitterSquare,
  BsFileFontFill,
  FcGoogle,
} from '@/components/icons';

// google
const getProgress = ({ textContent, totalLength = 60, yellowValue = 50 }) => {
  let currentLength = textContent.length;

  let percentage = Math.ceil((currentLength / totalLength) * 100);

  let color;
  if (percentage <= yellowValue) {
    color = 'yellow';
  } else if (percentage > yellowValue && percentage <= 100) {
    color = 'green';
  } else {
    color = 'red';
  }
  return { value: percentage, color };
};

export function SEO({ course, refetchSteps }) {
  const [
    insertSeo,
    {
      isSuccess: isInsertSeoSuccess,
      isLoading: isInsertSeoLoading,
      isError: isInsertSeoError,
      error: insertSeoError,
    },
  ] = useInsertSeoMutation();

  useEffect(() => {
    if (isInsertSeoSuccess) {
      showNotification({
        id: 'insertSeoSuccess',
        autoClose: 3000,
        title: `Seo Created`,
        message: `Seo has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchSteps();
    }

    if (isInsertSeoError) {
      const error = _.isObject(insertSeoError.errors)
        ? 'Input data is invalid.'
        : insertSeoError.errors;

      showNotification({
        id: 'insertSeoError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });

      console.log('insertSeoError.errors : ', insertSeoError.errors);
    }
  }, [isInsertSeoSuccess, isInsertSeoError]);

  ////////////////////////
  const [save, setSave] = useState(false);

  const initGoogleTitle = course?.course_attributes?.seo?.googleTitle || '';
  const [googleTitle, setGoogleTitle] = useState(initGoogleTitle);
  const [googleTitleProgress, setGoogleTitleProgress] = useState(
    getProgress({
      textContent: googleTitle,
      totalLength: 60,
      yellowValue: 60,
    }),
  );

  const initGoogleDescription = course?.course_attributes?.seo?.googleDescription || '';
  const [googleDescription, setGoogleDescription] = useState(initGoogleDescription);
  const [googleDescriptionProgress, setGoogleDescriptionProgress] = useState(
    getProgress({
      textContent: googleDescription,
      totalLength: 155,
      yellowValue: 75,
    }),
  );

  const initFacebookTitle = course?.course_attributes?.seo?.facebookTitle || '';
  const [facebookTitle, setFacebookTitle] = useState(initFacebookTitle);
  const [facebookTitleProgress, setFacebookTitleProgress] = useState(
    getProgress({
      textContent: facebookTitle,
      totalLength: 60,
      yellowValue: 60,
    }),
  );

  const initFacebookDescription = course?.course_attributes?.seo?.facebookDescription || '';
  const [facebookDescription, setFacebookDescription] = useState(initFacebookDescription);
  const [facebookDescriptionProgress, setFacebookDescriptionProgress] = useState(
    getProgress({
      textContent: facebookDescription,
      totalLength: 155,
      yellowValue: 75,
    }),
  );

  const initTwitterTitle = course?.course_attributes?.seo?.twitterTitle || '';
  const [twitterTitle, setTwitterTitle] = useState(initTwitterTitle);
  const [twitterTitleProgress, setTwitterTitleProgress] = useState(
    getProgress({
      textContent: twitterTitle,
      totalLength: 60,
      yellowValue: 60,
    }),
  );

  const initTwitterDescription = course?.course_attributes?.seo?.twitterDescription || '';
  const [twitterDescription, setTwitterDescription] = useState(initTwitterDescription);
  const [twitterDescriptionProgress, setTwitterDescriptionProgress] = useState(
    getProgress({
      textContent: twitterDescription,
      totalLength: 155,
      yellowValue: 75,
    }),
  );

  const initSlug = course?.slug || '';
  const [slug, setSlug] = useState(initSlug);

  const createSlugify = (slug) => {
    let finalSlug = slugify(slug, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    setSlug(finalSlug);
    return finalSlug;
  };

  const onChangeSlug = (event) => {
    setSlug(event.target.value);
  };

  // google
  const onChangeGoogleTitle = (event) => {
    setGoogleTitle(event.target.value);
    createSlugify(event.target.value);

    // onChangeGoogleTitleProgress();
    const googleProgress = getProgress({
      textContent: googleTitle,
      totalLength: 60,
      yellowValue: 60,
    });
    setGoogleTitleProgress(googleProgress);
  };

  const onChangeGoogleDescription = (event) => {
    setGoogleDescription(event.target.value);
    // onChangeGoogleDescriptionProgress();
    const googleProgress = getProgress({
      textContent: googleDescription,
      totalLength: 155,
      yellowValue: 75,
    });
    setGoogleDescriptionProgress(googleProgress);
  };

  // facebook
  const onChangeFacebookTitle = (event) => {
    setFacebookTitle(event.target.value);
    // onChangeFacebookTitleProgress();
    const facebookProgress = getProgress({
      textContent: facebookTitle,
      totalLength: 60,
      yellowValue: 50,
    });
    setFacebookTitleProgress(facebookProgress);
  };

  const onChangeFacebookDescription = (event) => {
    setFacebookDescription(event.target.value);
    // onChangeFacebookDescriptionProgress();
    const facebookProgress = getProgress({
      textContent: facebookDescription,
      totalLength: 155,
      yellowValue: 75,
    });
    setFacebookDescriptionProgress(facebookProgress);
  };

  // twitter
  const onChangeTwitterTitle = (event) => {
    setTwitterTitle(event.target.value);
    // onChangeTwitterTitleProgress();
    const twitterProgress = getProgress({
      textContent: twitterTitle,
      totalLength: 60,
      yellowValue: 50,
    });
    setTwitterTitleProgress(twitterProgress);
  };

  const onChangeTwitterDescription = (event) => {
    setTwitterDescription(event.target.value);
    // onChangeTwitterDescriptionProgress();
    const twitterProgress = getProgress({
      textContent: twitterDescription,
      totalLength: 155,
      yellowValue: 75,
    });
    setTwitterDescriptionProgress(twitterProgress);
  };

  const onSubmitForm = () => {
    setSave(true);
    if (
      slug &&
      googleTitle &&
      googleDescription &&
      facebookTitle &&
      facebookDescription &&
      twitterTitle &&
      twitterDescription
    ) {
      const seoData = {
        slug: createSlugify(slug),
        seo: {
          googleTitle,
          googleDescription,
          facebookTitle,
          facebookDescription,
          twitterTitle,
          twitterDescription,
        },
        course_id: course.id,
      };
      console.log('test pass and ready to submit, SEO : ', seoData);
      insertSeo(seoData);
    }
  };

  return (
    <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
      <Flex w="100%" align="center" justify="space-between">
        <Text>
          <b>Course:</b> {course.title}
        </Text>
        <Button
          onClick={onSubmitForm}
          compact
          color="lmsLayout"
          leftIcon={<FaSave size={16} />}
          loading={isInsertSeoLoading}
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
        <Flex justify="center" align="center">
          <FcGoogle size={24} />
          <Title order={4}>oogle SEO</Title>
        </Flex>
        <Stack w="100%" spacing="xs">
          <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="SEO Title"
            name="google_title"
            error={save && !googleTitle && 'Please, type seo title for better SEO.'}
            value={googleTitle}
            onChange={onChangeGoogleTitle}
            required
            icon={<BsFileFontFill size={16} style={{ opacity: 0.7 }} />}
            placeholder="create course title for Search Engine Optimization."
          />

          <Progress
            sx={inputStylesFull}
            color={googleTitleProgress.color}
            radius="xl"
            value={googleTitleProgress.value}
            striped
          />
        </Stack>
        <TextInput
          sx={inputStylesFull}
          withAsterisk
          label="Course Slug (URL)"
          name="slug"
          error={
            insertSeoError?.errors?.slug || (save && !slug && 'Please, type course slug for URL.')
          }
          value={slug}
          onChange={onChangeSlug}
          required
          icon={<FaLink size={16} style={{ opacity: 0.7 }} />}
          placeholder="create-course-title-for-search-engine-optimization"
        />
        <Stack w="100%" spacing="xs">
          <Textarea
            sx={textareaStyleFull}
            withAsterisk
            label="Meta Description"
            name="googe_description"
            error={save && !googleDescription && 'Please, type course meta description for SEO.'}
            value={googleDescription}
            onChange={onChangeGoogleDescription}
            required
            description="Please provide a meta description. If you don’t, Google will try to find a relevant part of your post to show in the search results."
            placeholder="write meta description."
            minRows={4}
          />

          <Progress
            sx={inputStylesFull}
            color={googleDescriptionProgress.color}
            radius="xl"
            value={googleDescriptionProgress.value}
            striped
          />
        </Stack>

        <Divider my="sm" variant="dashed" />
        {/* facebook  */}
        <Flex justify="center" align="center">
          <FaFacebookSquare size={24} style={{ color: '#356BC4' }} />
          <Title order={4}>acebook & Open Graph Social Media</Title>
        </Flex>
        <Stack w="100%" spacing="xs">
          <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="Social Media Title"
            name="facebook_title"
            error={save && !facebookTitle && 'Please, type title for social media plateforms.'}
            value={facebookTitle}
            onChange={onChangeFacebookTitle}
            required
            icon={<BsFileFontFill size={16} style={{ opacity: 0.7 }} />}
            placeholder="create course title for socail media."
          />

          <Progress
            sx={inputStylesFull}
            color={facebookTitleProgress.color}
            radius="xl"
            value={facebookTitleProgress.value}
            striped
          />
        </Stack>

        <Stack w="100%" spacing="xs">
          <Textarea
            sx={textareaStyleFull}
            withAsterisk
            label="Social Media Description"
            name="facebook_description"
            error={save && !facebookDescription && 'Please, type course facebook description.'}
            value={facebookDescription}
            onChange={onChangeFacebookDescription}
            required
            placeholder="write facebook and social media description."
            minRows={4}
          />

          <Progress
            sx={inputStylesFull}
            color={facebookDescriptionProgress.color}
            radius="xl"
            value={facebookDescriptionProgress.value}
            striped
          />
        </Stack>

        {/* twitter  */}
        <Divider my="sm" variant="dashed" />

        <Flex justify="center" align="center">
          <FaTwitterSquare size={24} style={{ color: '#27AAE1' }} />
          <Title order={4}>Twitter Card</Title>
        </Flex>
        <Stack w="100%" spacing="xs">
          <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="Twitter Title"
            name="twitter_title"
            error={save && !twitterTitle && 'Please, type title for twitter card'}
            value={twitterTitle}
            onChange={onChangeTwitterTitle}
            required
            icon={<BsFileFontFill size={16} style={{ opacity: 0.7 }} />}
            placeholder="create course title for twitter card."
          />

          <Progress
            sx={inputStylesFull}
            color={twitterTitleProgress.color}
            radius="xl"
            value={twitterTitleProgress.value}
            striped
          />
        </Stack>

        <Stack w="100%" spacing="xs">
          <Textarea
            sx={textareaStyleFull}
            withAsterisk
            label="Twitter Description"
            name="Twitter_description"
            error={save && !twitterDescription && 'Please, type course twitter card description.'}
            value={twitterDescription}
            onChange={onChangeTwitterDescription}
            required
            placeholder="write twitter card description."
            minRows={4}
          />

          <Progress
            sx={inputStylesFull}
            color={twitterDescriptionProgress.color}
            radius="xl"
            value={twitterDescriptionProgress.value}
            striped
          />
        </Stack>
      </Stack>
      <Flex w="100%" align="center" justify="center" py={32}>
        <Button
          onClick={onSubmitForm}
          color="lmsLayout"
          leftIcon={<FaSave size={16} />}
          loading={isInsertSeoLoading}
        >
          save
        </Button>
      </Flex>
    </Paper>
  );
}

export default SEO;
