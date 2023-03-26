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
    key: 'gfdasafdsaf',
    wsHost: window.location.hostname,
    // wsHost: '127.0.0.1',
    wsPort: 6001,
    disableStats: true,

    forceTLS: false,
    // encrypted: true,  //ably
    cluster: 'mt1',
  },
};

export default config;
