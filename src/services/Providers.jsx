import { MantineProvider, createEmotionCache } from '@mantine/core';
import { Provider as ReactReduxProvider } from 'react-redux';
import { NotificationsProvider } from '@mantine/notifications';
import rtlPlugin from 'stylis-plugin-rtl';

import { store } from '@/store';
import lmsProTheme from '@/theme/lmsProTheme';

const rtlCache = createEmotionCache({
  key: 'mantine-rtlpkfan',
  stylisPlugins: [rtlPlugin],
});

const getDirectionFromHtmlTag = () => {
  const direction = document.querySelector('html').getAttribute('dir');
  console.log('direction', direction);
  return direction;
};

function Providers({ children }) {
  let dir = getDirectionFromHtmlTag();

  return (
    <ReactReduxProvider store={store}>
      <MantineProvider
        emotionCache={dir == 'rtl' ? rtlCache : undefined}
        theme={{ ...lmsProTheme, dir }}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
    </ReactReduxProvider>
  );
}

export default Providers;
