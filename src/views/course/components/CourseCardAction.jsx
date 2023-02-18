import { Tooltip, ActionIcon } from '@mantine/core';
import { FaEdit } from 'react-icons/fa';

export function CourseCardAction({ children, tooltip, ...others }) {
  return (
    <Tooltip label={tooltip} color="lmsLayout" withArrow arrowPosition="center">
      <ActionIcon variant="transparent" {...others}>
        {children}
      </ActionIcon>
    </Tooltip>
  );
}

export default CourseCardAction;
