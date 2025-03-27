module.exports = {
  assets: ['./assets/fonts'],
  dependencies: {
    'react-native-asset': {
      platforms: {
        ios: null, // This disables iOS linking
      },
    },
  },
};
