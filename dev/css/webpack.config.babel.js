import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { projectRoot, } from '../../setting/config'

const scssRoot = path.join( projectRoot, 'static/src/scss' )
const cssRoot = path.join( projectRoot, 'static/dist/css' )
const isDevMode = process.env.NODE_ENV === 'development'

export default {
  mode: isDevMode ? 'development' : 'production',
  target: 'web',
  entry: {
    'home/index': path.join( scssRoot, 'home/index.scss' )
  },
  output: {
    path: cssRoot,
    filename: '[name]-do-not-use-me.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
              loader:  MiniCssExtractPlugin.loader,
              options: {
                  filename: '[name].min.css',
              },
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: '[name].min.css',
    } ),
  ]
}
