import { MantineProvider } from '@mantine/core';
import { Provider as ReactReduxProvider } from 'react-redux';
import { NotificationsProvider } from '@mantine/notifications';

import { store } from '@/store';
import lmsProTheme from '@/theme/lmsProTheme';

function Providers({ children }) {
  return (
    <ReactReduxProvider store={store}>
      <MantineProvider theme={lmsProTheme} withCSSVariables withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
      ;
    </ReactReduxProvider>
  );
}

export default Providers;
