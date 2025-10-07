module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        ['module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true
        }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }]
      ],
    };
  };
  