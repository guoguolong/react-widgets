const { resolve } = require('path')
const { ESBuildPlugin } = require('esbuild-loader')

module.exports = {
  entry: './src/index.js',
  experiments: {
    outputModule: true
  },
  devtool: 'source-map',
  output: {
    module: true,
    libraryTarget: 'module',
    // libraryTarget: 'commonjs2',
    path: resolve(__dirname, 'es'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          exclude: /node_modules/,
          options: {
            loader: 'jsx', // Remove this if you're not using JSX
            target: 'es2015' // Syntax to compile to (see options below for possible values)
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2015'
        }
      },
    ],
  },
  plugins: [
   new ESBuildPlugin()
  ]
}