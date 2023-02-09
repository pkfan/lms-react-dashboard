const { CracoAliasPlugin } = require('react-app-alias');
module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,

      options: {
        // source: 'jsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from jsconfig
        // baseUrl: './',
      },
    },
  ],
};
