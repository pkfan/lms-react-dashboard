import _ from 'lodash';
import { useState } from 'react';
import { TextInput, Stack, Flex, Title, Text, Textarea, NumberInput } from '@mantine/core';
import { Button, SwtichText } from '@/components';
import { useForm, hasLength } from '@mantine/form';
import { chapterVisibility } from '@/enums';
import { ImEyeBlocked, ImEye, BiAddToQueue } from '@/components/icons';

export function ChapterCreateForm({
  onSubmitHandle,
  chapters,
  chapter,
  isChapterLoading,
  submitButtonName = 'Add Chapter',
}) {
  let initVisibility;
  let chaptersLength;

  if (chapters) {
    chaptersLength = chapters?.length > 0 ? chapters.length + 1 : null;
    initVisibility = false;
  } else if (chapter) {
    chaptersLength = chapter.number;
    initVisibility = chapterVisibility(chapter.visibility) == 'private';
  }

  const [isPrivate, setIsPrivate] = useState(Boolean(initVisibility));

  const form = useForm({
    initialValues: {
      number: chaptersLength,
      name: chapter?.name || '',
      description: chapter?.description || '',
    },

    validate: {
      number: (value) => (!value ? 'Chapter Number Required' : null),
      name: hasLength({ min: 4 }, 'Too short'),
      description: hasLength({ min: 16 }, 'Too short'),
    },
  });

  const submitChapterForm = (values) => {
    // onSubmitHandle(form.values);
    values['visibility'] = isPrivate ? 'private' : 'public';
    onSubmitHandle(values);
    if (!chapter) {
      form.setValues({ number: values.number + 1, name: '', description: '' });
    }
  };

  return (
    <form onSubmit={form.onSubmit(submitChapterForm)} style={{ width: '100%' }}>
      <Stack w="70%" mx="auto">
        <NumberInput
          withAsterisk
          sx={(theme) => ({
            width: '100%',
            '& input': {
              backgroundColor: theme.colors.lmsLayout[1],
            },
            '& input::placeholder': {
              color: theme.colors.lmsLayout[4],
            },
          })}
          label="Chapter Number"
          placeholder="Enter Chapter Number"
          min={1}
          name="number"
          {...form.getInputProps('number')}
        />
        <TextInput
          sx={(theme) => ({
            width: '100%',
            '& input': {
              backgroundColor: theme.colors.lmsLayout[1],
            },
            '& input::placeholder': {
              color: theme.colors.lmsLayout[4],
            },
          })}
          withAsterisk
          label="Chapter Name"
          placeholder="Enter Chapter Name"
          {...form.getInputProps(`name`)}
        />
        <Textarea
          sx={(theme) => ({
            width: '100%',
            '& textarea': {
              backgroundColor: theme.colors.lmsLayout[1],
            },
            '& textarea::placeholder': {
              color: theme.colors.lmsLayout[4],
            },
          })}
          withAsterisk
          label="Chapter Description"
          placeholder="Enter Chapter Description"
          minRows={3}
          {...form.getInputProps(`description`)}
        />
        <Flex align="center" gap={24} sx={{ padding: '0 32px' }}>
          {!isPrivate && <ImEye size={20} style={{ opacity: 0.7 }} />}
          {isPrivate && <ImEyeBlocked size={20} style={{ opacity: 0.7 }} />}
          <Title order={5}> Chapter Visibility</Title>
          <SwtichText
            onLabel="private"
            offLabel="public"
            checked={isPrivate}
            setChecked={setIsPrivate}
            color="lmsPrimary"
          />
        </Flex>
        <Text px={32}>
          Anyone can view your PUBLIC chapters and its Lessons
          <br />
          (i.e. introduction of your course is a public chapter)
          <br />
          <br />
          Private chapters can be viewed/accessed only by buyers of your course.
        </Text>
        <Button
          type="submit"
          color="lmsSecondary"
          leftIcon={<BiAddToQueue size={18} />}
          loading={isChapterLoading}
        >
          {submitButtonName}
        </Button>
      </Stack>
    </form>
  );
}

export default ChapterCreateForm;
