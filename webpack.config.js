const { resolve } = require('path')

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  output: {
    libraryTarget: "commonjs2",
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
    react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
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
    ]
  },
  plugins: []
}