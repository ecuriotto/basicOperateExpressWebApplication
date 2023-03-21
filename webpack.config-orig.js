var path = require('path');

module.exports = {
  mode: 'development',
  entry: { app: './src/public/app.js', utils: './src/public/utils.js' },
  output: {
    path: path.resolve(__dirname, 'src/public'),
    filename: './[name].bundled.js',
    // and also this — which requires the previous block
    libraryTarget: 'module',
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        type: 'asset/source',
      },
    ],
  },
  // this needs to be added to build a library target as ESM
  experiments: {
    outputModule: true,
  },
};
