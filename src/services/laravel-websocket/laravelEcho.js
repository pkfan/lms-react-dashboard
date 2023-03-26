// import config from '@/config';
// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//   broadcaster: config.laravelEcho.broadcaster,
//   key: config.laravelEcho.key,
//   wsHost: config.laravelEcho.wsHost,
//   wsPort: config.laravelEcho.wsPort,
//   cluster: config.laravelEcho.cluster,
//   forceTLS: config.laravelEcho.forceTLS,
//   disableStats: config.laravelEcho.disableStats,
// });

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'your-pusher-key',
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});
