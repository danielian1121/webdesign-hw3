import path from 'path'
import { projectRoot, } from '../../setting/config'

const pugRoot = path.join( projectRoot, 'static/src/pug' )
const htmlRoot = path.join( projectRoot, 'static/dist/html' )
const isDevMode = process.env.NODE_ENV === 'development'

export default {
  mode: isDevMode ? 'development' : 'production',
  target: 'web',
  entry: {
    'home/index': path.join( pugRoot, 'home/index.pug' )
  },
  output: {
    path: htmlRoot,
    filename: '[name]-do-not-use-me.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /pug\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+).pug/,
              name: '[1]/[2].html'
            }
          },
          'extract-loader',
          {
            loader:  'html-loader',
          },
          {
            loader:  'pug-html-loader',
            options: {
              basedir: pugRoot,
            }
          }
        ]
      }
    ]
  }
}
