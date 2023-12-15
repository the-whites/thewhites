const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  plugins: [
    new ESLintPlugin({
      emitWarning: true,
    }),
  ],
};
