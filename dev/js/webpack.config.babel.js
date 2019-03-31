import path from 'path'
import { projectRoot, } from '../../setting/config'

const jsSrcRoot = path.join( projectRoot, 'static/src/js' )
const jsDistRoot = path.join( projectRoot, 'static/dist/js' )
const isDevMode = process.env.NODE_ENV === 'development'

export default {
  mode: isDevMode ? 'development' : 'production',
  target: 'web',
  entry: {
    'home/index': path.join( jsSrcRoot, 'home/index.js' )
  },
  output: {
    path: jsDistRoot,
    filename: '[name].min.js',
  },
}
