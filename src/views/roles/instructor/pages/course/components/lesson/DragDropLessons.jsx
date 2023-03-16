import { useState, useEffect } from 'react';
import { Grid, Stack, Box, Title, Text, Flex, Group } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons';

// const listItems = Array(10)
//   .fill(0)
//   .map((_, i) => i);

export function DragDropLessons({ items, setitems }) {
  // const [items, setitems] = useState(lessons);

  // console.log('DragDropLessons lessons :', lessons);
  console.log('DragDropLessons items :', items);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // `destination` is `undefined` if the item was dropped outside the list
    // In this case, do nothing
    if (!result.destination) {
      return;
    }

    const itemsReorder = reorder(items, result.source.index, result.destination.index);

    setitems(itemsReorder);
  };

  // change item in every component
  const DragDropItemComponent = ({ item: lesson, index }) => {
    return (
      <Grid
        sx={(theme) => ({
          border: `1px solid ${theme.colors.lmsLayout[3]}`,
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          margin: '8px 0px',
        })}
      >
        <Grid.Col
          span={12}
          xs={1}
          sx={(theme) => ({
            backgroundColor: theme.colors.lmsPrimary[0],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
          })}
        >
          <Stack align="center" justify="center" spacing="xs">
            <IconGripVertical size={28} style={{ opacity: 0.6 }} />
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={1}
          sx={(theme) => ({
            borderLeft: `1px solid ${theme.colors.lmsLayout[1]}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.yellow[0],
          })}
        >
          <Stack align="center" justify="center">
            <Box
              sx={(theme) => ({
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: `2px solid ${theme.colors.lmsLayout[3]}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              })}
            >
              <Title
                order={4}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {index + 1}
              </Title>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={10}
          sx={(theme) => ({ backgroundColor: theme.colors.lmsSecondary[0] })}
        >
          <Stack justify="center">
            <Title order={5}> {lesson.name}</Title>
          </Stack>
        </Grid.Col>
      </Grid>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items?.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}-id`} index={index}>
                {(provided, snapshot) => (
                  <div
                    style={provided.draggableProps.style}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DragDropItemComponent item={item} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropLessons;
