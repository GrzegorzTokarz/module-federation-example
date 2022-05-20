module.exports = {
  name: 'other-app',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
