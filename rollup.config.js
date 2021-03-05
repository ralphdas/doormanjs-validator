import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';

const output = [
  {
    file: './dist/iife/bundle.iife.js',
    format: 'iife',
    name: 'doormanjs',
    plugins: [terser()],
  },
  {
    file: './dist/cjs/bundle.cjs.js',
    format: 'cjs',
    plugins: [terser()],
  },
  {
    file: './dist/esm/bundle.esm.js',
    format: 'esm',
    plugins: [terser()],
  },
];

export default {
  input: './src/index.ts',
  output,
  plugins: [
    json(),
    del({ targets: ['./dist/*'] }),
    nodeResolve(),
    typescript(),
  ],
};
