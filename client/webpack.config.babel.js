// Import statements are not used despite the .babel.js extension so that
// webpack can handle modules for the application (see .babelrc).
const webpack = require('webpack');
const { join } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const PreloadPlugin = require('preload-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const context = __dirname;
const host = '0.0.0.0';
const port = 8000;

const config = {
  context,
  entry: [
    'style-loader!css-loader!sanitize.css/sanitize.css',
    'style-loader!css-loader!lato-font/css/lato-font.css',
    './src/index.jsx',
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: join(context, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'file-loader',
    }],
  },
  plugins: [
    new HtmlPlugin({
      title: 'PCO GraphQL Demo',
    }),
    new PreloadPlugin(),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval-source-map';
  config.entry.unshift('react-hot-loader/patch');
  config.output.publicPath = `http://${host}:${port}/`;
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  );
  config.devServer = {
    host,
    port,
    hot: true,
    historyApiFallback: true,
    headers: {
      // Required for hot-loading to work out of docker container
      'Access-Control-Allow-Origin': '*',
    },
    proxy: [{
      context: ['/auth', '/graphql', '/debug'],
      target: 'http://server:8000',
    }],
  };
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new BabiliPlugin({}, {
      parserOpts: {
        plugins: ['dynamicImport'],
      },
    }),
  );
}

module.exports = config;
