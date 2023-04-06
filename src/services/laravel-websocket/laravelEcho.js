import axios from 'axios';
import Echo from 'laravel-echo';
import config from '@/config';

window.Pusher = require('pusher-js');

axios.defaults.withCredentials = true;

const url = `${config.domainUrl}/broadcasting/auth`;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'app-key',
  cluster: 'mt1',
  wsHost: window.location.hostname,
  wsPort: 6001,
  wssPort: 6001,
  disableStats: true,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],

  authEndpoint: url,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios({
          url: url,
          method: 'POST',
          data: {
            socket_id: socketId,
            channel_name: channel.name,
          },
          // withCredentials: true,
        })
          .then((response) => {
            console.log('laravel websocket Echo callback(false, response.data);', response.data);
            callback(false, response.data);
          })
          .catch((error) => {
            console.log('laravel websocket Echo callback(true, error);', error);

            callback(true, error);
          });
      },
    };
  },
});

window.Echo.private('public').listen('.Lms\\Base\\Course\\Events\\PublicEvent', (e) => {
  console.log('PublicEvent : ', e);
});

// window.Echo.private('App.Models.User.1').notification((notification) => {
//   console.log(notification);
// });

window.Echo.private('App.Models.User.1').notification((notification) => {
  console.log(notification);
});
