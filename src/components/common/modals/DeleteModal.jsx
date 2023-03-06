import { Modal, Flex, Stack, Box } from '@mantine/core';
import Button from '../Button';
import ButtonWhite from '../ButtonWhite';

export function DeleteModal({
  title = 'Delete',
  children,
  confirm,
  opened,
  close,
  isDeleting = false,
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        sx={(theme) => ({
          '& .mantine-Modal-title': {
            fontWeight: 'bold',
            fontSize: '20px',
            color: theme.colors.red[5],
          },
        })}
      >
        <Stack>
          <Box>{children}</Box>
          <Flex align="center" justify="end" gap={16}>
            <ButtonWhite onClick={close}>Cancel</ButtonWhite>
            <Button color="red" onClick={confirm} loading={isDeleting}>
              Delete
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
}

export default DeleteModal;
