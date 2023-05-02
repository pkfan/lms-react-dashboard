import { Modal } from '@mantine/core';
import ChapterCreateForm from './ChapterCreateForm';

export function EditChapterModal({ chapter, onSubmitHandle, isChapterLoading, opened, close }) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Chapter"
        size="xl"
        sx={(theme) => ({
          '& .mantine-Modal-title': {
            fontWeight: 'bold',
            fontSize: '20px',
            color: theme.colors.lmsPrimary[6],
          },
        })}
      >
        <ChapterCreateForm
          chapter={chapter}
          onSubmitHandle={onSubmitHandle}
          isChapterLoading={isChapterLoading}
          submitButtonName="Update Chapter"
        />
      </Modal>
    </>
  );
}

export default EditChapterModal;
