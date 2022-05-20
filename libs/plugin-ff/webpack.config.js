const withModuleFederation = require('@nrwl/react/module-federation');
const mfeConfig = require('./mfe.config');

module.exports = withModuleFederation({
  ...mfeConfig,
}).then((modifyConfig) => {
  return (config, context) => {
    // const optimization = { ...config.optimization };
    const federatedConfig = modifyConfig(config);
    federatedConfig.entry = {};
    // federatedConfig.plugins.pop(); //seems like a bug in nx, lets remove replace plugin
    // federatedConfig.optimization.minimize = optimization.minimize;
    return federatedConfig;
  };
});
