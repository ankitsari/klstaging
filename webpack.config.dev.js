var path = require('path');
var webpack = require('webpack');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/klocker'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    noParse: /node_modules\/reactstrap-tether\/dist\/js\/tether.js/,
    loaders: [
      // js
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client')
      },
      // CSS
      { 
        test: /\.css$/, 
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader'
        
      },

      // Images 
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.join(__dirname, 'client'),
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },

      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },

      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      }
    ]
  }
};
