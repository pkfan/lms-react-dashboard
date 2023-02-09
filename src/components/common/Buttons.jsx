import './Buttons.css';

import { Button } from '@mantine/core';
import { IconDatabase } from '@tabler/icons';

function Buttons() {
  return (
    <>
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
        Indigo cyan
      </Button>

      <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
        Lime green
      </Button>

      <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
        Teal blue
      </Button>
      <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
        Orange red
      </Button>
      <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
        Peach
      </Button>

      <Button
        leftIcon={<IconDatabase />}
        color="lmsLayout"
        // sx={(theme) => ({ backgroundColor: theme.colors.lmsSecondary[9] })}
      >
        Connect to database
      </Button>
    </>
  );
}

export default Buttons;
