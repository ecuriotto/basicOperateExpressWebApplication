var path = require('path');

module.exports = {
  mode: 'development',
  entry: 
      { utils: './src/public/utils.js' }
  ,
  output: {
    path: path.resolve(__dirname, 'src/public'),
    filename: './[name].bundled.js',
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
