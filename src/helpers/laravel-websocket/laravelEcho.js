import config from '@/config';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: config.laravelEcho.broadcaster,
  key: config.laravelEcho.key,
  wsHost: config.laravelEcho.wsHost,
  wsPort: config.laravelEcho.wsPort,
  forceTLS: config.laravelEcho.forceTLS,
  disableStats: config.laravelEcho.disableStats,
});
