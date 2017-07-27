const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const jsSourcePath = path.join(__dirname, './source/js');
const buildPath = path.join(__dirname, './build');
const imgPath = path.join(__dirname, './source/assets/img');
const sourcePath = path.join(__dirname, './source');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


let plugins = [
  new SpriteLoaderPlugin(),
  new ExtractTextPlugin('style.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })


];
let rules = [
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      'file-loader'
    ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      'file-loader'
    ]
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.css$/,
    use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })),
  },
  {
    test: /\.svg$/,
    include: /img/,
    use: [  {loader: 'svg-sprite-loader'}]

  },
  {
    test: /\.scss$/,
    use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
      use: ['css-loader', 'sass-loader']
    }))
  }
];


var config  =
  {

    entry: {
      js: './source/js/index.js',
    },
    output: {
      path: buildPath,
      publicPath: '/',
      filename: 'app.js',
    },
    module: {
      rules,
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        jsSourcePath,
      ],
    },
    plugins
  };


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true
      }
    })
  )

} else {
  config.devServer = {
    contentBase: buildPath,
    compress: true,
    port: 9000,
    host: "0.0.0.0",
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}
module.exports = config;