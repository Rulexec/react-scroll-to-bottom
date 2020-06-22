import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

export default {
  external: ['react'],
  input: 'lib/index.umd.js',
  output: {
    file: 'dist/react-scroll-to-bottom.development.js',
    format: 'umd',
    globals: {
      react: 'React'
    },
    name: 'ReactScrollToBottom',
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': "'production'"
    }),
    resolve({
      browser: true
    }),
    commonjs()
  ]
};
