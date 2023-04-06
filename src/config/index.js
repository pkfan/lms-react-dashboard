const domainUrl = 'http://localhost:8000';

const config = {
  // domainUrl: window.location.origin,
  // baseUrl: 'http://localhost:8000/api',
  domainUrl,
  baseUrl: `${domainUrl}/api`,

  imageUploadSize: '10-MB',
};

export default config;
