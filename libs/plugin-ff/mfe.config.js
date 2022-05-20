module.exports = {
  name: 'plugin-ff',
  exposes: {
    './Module': './src/index.ts',
  },
  shared: (libraryName, library) => {
    console.log(libraryName, library);

    return library;
  },
};
