import { Group, TextInput, Textarea, Box, Center, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Button } from '@/components';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  IconGripVertical,
  IconX,
  RiDeleteBin2Fill,
  BiAddToQueue,
  FaSave,
} from '@/components/icons';

export function DragDrop2Inputs({
  buttonName,
  data = [{ question: '', answer: '' }],
  submitData,
  placeholder_1,
  placeholder_2,
  savingData,
}) {
  const form = useForm({
    initialValues: {
      data: data,
    },
  });

  const onSubmitHandle = () => {
    const data = form.values.data.filter(
      (value) => Boolean(value.question) && Boolean(value.answer),
    );
    if (data.length <= 0) {
      showNotification({
        id: 'emptyDragDrop2Inputs',
        disallowClose: true,
        autoClose: 3000,
        title: 'Errors!!!',
        message: `please ${buttonName}, then save.`,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
      return;
    }
    submitData(data);
  };

  const fields = form.values.data.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group
          sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
          ref={provided.innerRef}
          mt="xs"
          {...provided.draggableProps}
        >
          <Center {...provided.dragHandleProps}>
            <IconGripVertical size={18} />
          </Center>
          <Box w="70%">
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
              placeholder={placeholder_1}
              {...form.getInputProps(`data.${index}.question`)}
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
              placeholder={placeholder_2}
              minRows={4}
              {...form.getInputProps(`data.${index}.answer`)}
            />
          </Box>
          <ActionIcon
            color="red"
            variant="transparent"
            onClick={() => form.removeListItem('data', index)}
          >
            <RiDeleteBin2Fill size={18} />
          </ActionIcon>
        </Group>
      )}
    </Draggable>
  ));

  return (
    <Box sx={{ width: '100%' }} mx="auto">
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          form.reorderListItem('data', { from: source.index, to: destination.index })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Group position="center" mt="md">
        <Button
          color="lmsSecondary"
          leftIcon={<BiAddToQueue size={16} />}
          onClick={() => form.insertListItem('data', { question: '', answer: '' })}
        >
          {buttonName}
        </Button>
        <Button
          color="lmsLayout"
          leftIcon={<FaSave size={16} />}
          onClick={onSubmitHandle}
          loading={savingData}
        >
          save
        </Button>
      </Group>

      {/* <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
    </Box>
  );
}

export default DragDrop2Inputs;
