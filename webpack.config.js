const { resolve } = require('path')
const { ESBuildPlugin } = require('esbuild-loader')
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    library: "LIB",
    libraryTarget: "var",
    path: resolve(__dirname, 'es'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx'],
    alias: {
      '@': resolve('src')
    }
  },
  externals: {
     'react': 'React'
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
   new EsmWebpackPlugin(),
   new ESBuildPlugin()
  ]
}