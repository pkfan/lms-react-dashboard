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
  Textarea,
  Progress,
  Box,
} from '@mantine/core';
import Button from '@/components/common/Button';

import { FaLink, FaSave, FaFacebookSquare, FaTwitterSquare, FaPercent } from 'react-icons/fa';
import { BsFileFontFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { TbShoppingCartDiscount } from 'react-icons/tb';

import inputStylesFull from '@/styles/inputStylesFull';
import { useForm, isEmail, hasLength } from '@mantine/form';
import Select from '@/components/common/form/Select';
import SwtichText from '@/components/common/SwitchText';
import textareaStyleFull from '@/styles/textareaStyleFull';
import { FcGoogle } from 'react-icons/fc';
import slugify from 'slugify';

export function SEO() {
  const [save, setSave] = useState(false);

  const [googleTitle, setGoogleTitle] = useState('');
  const [googleTitleProgress, setGoogleTitleProgress] = useState({ value: 0, color: '' });

  const [googleDescription, setGoogleDescription] = useState('');
  const [googleDescriptionProgress, setGoogleDescriptionProgress] = useState({
    value: 0,
    color: '',
  });

  const [facebookTitle, setFacebookTitle] = useState('');
  const [facebookTitleProgress, setFacebookTitleProgress] = useState({ value: 0, color: '' });

  const [facebookDescription, setFacebookDescription] = useState('');
  const [facebookDescriptionProgress, setFacebookDescriptionProgress] = useState({
    value: 0,
    color: '',
  });

  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterTitleProgress, setTwitterTitleProgress] = useState({ value: 0, color: '' });

  const [twitterDescription, setTwitterDescription] = useState('');
  const [twitterDescriptionProgress, setTwitterDescriptionProgress] = useState({
    value: 0,
    color: '',
  });

  const [slug, setSlug] = useState('');

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
  };

  const onChangeSlug = (event) => {
    setSlug(event.target.value);
  };

  // google
  const onChangeGoogleTitleProgress = () => {
    const totalLength = 70;
    let currentLength = googleTitle.length;

    let percentage = Math.ceil((currentLength / totalLength) * 100);

    let color;
    if (percentage <= 50) {
      color = 'yellow';
    } else if (percentage > 50 && percentage <= 100) {
      color = 'green';
    } else {
      color = 'red';
    }
    setGoogleTitleProgress({ value: percentage, color });
  };
  const onChangeGoogleDescriptionProgress = () => {
    const totalLength = 155;
    let currentLength = googleDescription.length;

    let percentage = Math.ceil((currentLength / totalLength) * 100);

    let color;
    if (percentage < 75) {
      color = 'yellow';
    } else if (percentage >= 75 && percentage <= 100) {
      color = 'green';
    } else {
      color = 'red';
    }
    setGoogleDescriptionProgress({ value: percentage, color });
  };

  const onChangeGoogleTitle = (event) => {
    setGoogleTitle(event.target.value);
    createSlugify(event.target.value);
    onChangeGoogleTitleProgress();
  };

  const onChangeGoogleDescription = (event) => {
    setGoogleDescription(event.target.value);
    onChangeGoogleDescriptionProgress();
  };

  // facebook
  const onChangeFacebookTitleProgress = () => {
    const totalLength = 60;
    let currentLength = facebookTitle.length;

    let percentage = Math.ceil((currentLength / totalLength) * 100);

    let color;
    if (percentage <= 50) {
      color = 'yellow';
    } else if (percentage > 50 && percentage <= 100) {
      color = 'green';
    } else {
      color = 'red';
    }
    setFacebookTitleProgress({ value: percentage, color });
  };
  const onChangeFacebookDescriptionProgress = () => {
    const totalLength = 155;
    let currentLength = facebookDescription.length;

    let percentage = Math.ceil((currentLength / totalLength) * 100);

    let color;
    if (percentage < 75) {
      color = 'yellow';
    } else if (percentage >= 75 && percentage <= 100) {
      color = 'green';
    } else {
      color = 'red';
    }
    setFacebookDescriptionProgress({ value: percentage, color });
  };

  const onChangeFacebookTitle = (event) => {
    setFacebookTitle(event.target.value);
    onChangeFacebookTitleProgress();
  };

  const onChangeFacebookDescription = (event) => {
    setFacebookDescription(event.target.value);
    onChangeFacebookDescriptionProgress();
  };

  // twitter
  const onChangeTwitterTitleProgress = () => {
    const totalLength = 60;
    let currentLength = twitterTitle.length;

    let percentage = Math.ceil((currentLength / totalLength) * 100);

    let color;
    if (percentage <= 50) {
      color = 'yellow';
    } else if (percentage > 50 && percentage <= 100) {
      color = 'green';
    } else {
      color = 'red';
    }
    setTwitterTitleProgress({ value: percentage, color });
  };
  const onChangeTwitterDescriptionProgress = () => {
    const totalLength = 155;
    let currentLength = twitterDescription.length;

    let percentage = Math.ceil((currentLength / totalLength) * 100);

    let color;
    if (percentage < 75) {
      color = 'yellow';
    } else if (percentage >= 75 && percentage <= 100) {
      color = 'green';
    } else {
      color = 'red';
    }
    setTwitterDescriptionProgress({ value: percentage, color });
  };

  const onChangeTwitterTitle = (event) => {
    setTwitterTitle(event.target.value);
    onChangeTwitterTitleProgress();
  };

  const onChangeTwitterDescription = (event) => {
    setTwitterDescription(event.target.value);
    onChangeTwitterDescriptionProgress();
  };

  return (
    <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
      <Flex w="100%" align="center" justify="end">
        <Button compact color="lmsLayout" leftIcon={<FaSave size={16} />}>
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
          {googleTitle && (
            <Progress
              sx={inputStylesFull}
              color={googleTitleProgress.color}
              radius="xl"
              value={googleTitleProgress.value}
              striped
            />
          )}
        </Stack>
        <TextInput
          sx={inputStylesFull}
          withAsterisk
          label="Course Slug (URL)"
          name="slug"
          error={save && !slug && 'Please, type course slug for URL.'}
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
          {googleDescription && (
            <Progress
              sx={inputStylesFull}
              color={googleDescriptionProgress.color}
              radius="xl"
              value={googleDescriptionProgress.value}
              striped
            />
          )}
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
          {facebookTitle && (
            <Progress
              sx={inputStylesFull}
              color={facebookTitleProgress.color}
              radius="xl"
              value={facebookTitleProgress.value}
              striped
            />
          )}
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
          {facebookDescription && (
            <Progress
              sx={inputStylesFull}
              color={facebookDescriptionProgress.color}
              radius="xl"
              value={facebookDescriptionProgress.value}
              striped
            />
          )}
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
          {twitterTitle && (
            <Progress
              sx={inputStylesFull}
              color={twitterTitleProgress.color}
              radius="xl"
              value={twitterTitleProgress.value}
              striped
            />
          )}
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
          {twitterDescription && (
            <Progress
              sx={inputStylesFull}
              color={twitterDescriptionProgress.color}
              radius="xl"
              value={twitterDescriptionProgress.value}
              striped
            />
          )}
        </Stack>
      </Stack>
      <Flex w="100%" align="center" justify="center" py={32}>
        <Button color="lmsLayout" leftIcon={<FaSave size={16} />}>
          save
        </Button>
      </Flex>
    </Paper>
  );
}

export default SEO;
