const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve:{
    fallback:{
        "buffer":require.resolve("buffer/"),
        "mqtt-packet": require.resolve("mqtt-packet/")
    }
  }
};
