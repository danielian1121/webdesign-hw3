import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { projectRoot, } from '../../setting/config'

const isDevMode = process.env.NODE_ENV === 'development'

export default {
  mode: isDevMode ? 'development' : 'production',
  target: 'node',
  externals: [ nodeExternals(), ],
  resolve:   {
    alias: {
        setting: path.join( projectRoot, 'setting' ),
    },
  },
  entry: ['babel-polyfill', './app.js'],
  output: {
    filename: 'app.min.js',
    path: path.join(projectRoot, 'bin')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
