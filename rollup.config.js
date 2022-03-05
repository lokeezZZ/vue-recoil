import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import {terser} from 'rollup-plugin-terser';

const inputFile = 'src/index.ts';
const externalLibs = ['vue'];

const commonPlugins = [
  nodeResolve(),
  commonjs(),
  typescript({
    skipDefaultLibCheck: true,
    skipLibCheck: true,
  }),
  json()
];

const productionPlugins = [
  ...commonPlugins,
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  terser({
    mangle: false,
  }),
];

const configs = [
  // CommonJS
  {
    input: inputFile,
    output: {
      dir: "dist",
      entryFileNames: "recoil.cjs.js",
      format: 'cjs',
      exports: 'named',
    },
    external: externalLibs,
    plugins: commonPlugins,
  },

  // ES
  {
    input: inputFile,
    output: {
      dir: "dist",
      entryFileNames: "recoil.es.js",
      format: 'es',
      exports: 'named',
    },
    external: externalLibs,
    plugins: commonPlugins,
  },
  // UMD Development
  {
    input: inputFile,
    output: {
      dir: "dist",
      entryFileNames: "recoil.umd.js",
      format: 'umd',
      name: 'Recoil',
      exports: 'named',
      globals: {
        vue: 'vue',
      },
    },
    external: externalLibs,
    plugins: commonPlugins,
  }
];

export default configs;
