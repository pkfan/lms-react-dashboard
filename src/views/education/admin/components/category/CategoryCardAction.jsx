import { Tooltip, ActionIcon } from '@mantine/core';

export function CategoryCardAction({ children, tooltip, ...others }) {
  return (
    <Tooltip label={tooltip} color="lmsLayout" withArrow arrowPosition="center">
      <ActionIcon variant="transparent" {...others}>
        {children}
      </ActionIcon>
    </Tooltip>
  );
}

export default CategoryCardAction;
