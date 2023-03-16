const domainUrl = 'http://localhost:8000';

const config = {
  // domainUrl: window.location.origin,
  // baseUrl: 'http://localhost:8000/api',
  domainUrl,
  baseUrl: `${domainUrl}/api`,

  imageUploadSize: '10-MB',

  //laravel websocket config
  laravelEcho: {
    broadcaster: 'pusher',
    key: 'cGtmYW5hbWlyQGdtYWlsLmNvbQ',
    // wsHost: window.location.hostname,
    wsHost: '127.0.0.1',
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
  },
};

export default config;
