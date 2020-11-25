import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';

const defaultNodeResolveConfig = {};
const nodeResolvePlugin = nodeResolve(defaultNodeResolveConfig);
import {terser} from 'rollup-plugin-terser';

const inputFile = 'src/index.ts';
const externalLibs = ['vue'];
const extensions = ['.ts'];

const commonPlugins = [
  babel({
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
    ],
    extensions: extensions,
    babelHelpers: 'bundled',
  }),
  {
    resolveId: source => {
      if (source === 'vue') {
        return {
          id: 'vue',
          external: true,
        };
      }
      return null;
    },
  },
  nodeResolvePlugin,
  commonjs(),
];

const developmentPlugins = [
  ...commonPlugins,
  replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
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
      file: `cjs/recoil.js`,
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
      file: `es/recoil.js`,
      format: 'es',
      exports: 'named',
    },
    external: externalLibs,
    plugins: commonPlugins,
  },

  // ES for Browsers
  {
    input: inputFile,
    output: {
      file: `es/recoil.mjs`,
      format: 'es',
      exports: 'named',
    },
    external: externalLibs,
    plugins: productionPlugins,
  },

  // UMD Development
  {
    input: inputFile,
    output: {
      file: `umd/recoil.js`,
      format: 'umd',
      name: 'Recoil',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    external: externalLibs,
    plugins: developmentPlugins,
  },

  // UMD Production
  {
    input: inputFile,
    output: {
      file: `umd/recoil.min.js`,
      format: 'umd',
      name: 'Recoil',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    external: externalLibs,
    plugins: productionPlugins,
  },
];

export default configs;
