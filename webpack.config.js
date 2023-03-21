var path = require('path');

module.exports = {
  mode: 'development',
  entry: 
      { utils: './src/public/utils.js' }
  ,
  output: {
    path: path.resolve(__dirname, 'src/public'),
    filename: './[name].bundled.js',
    // and also this — which requires the previous block
    //libraryTarget: 'module',
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        type: 'asset/source',
      },
      
    ],
  },

};
