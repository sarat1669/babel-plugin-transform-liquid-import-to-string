import path from 'path';

import pluginTester from 'babel-plugin-tester'

import transformLiquidImportToString from '..'

pluginTester({
  plugin: transformLiquidImportToString,
  pluginName: 'transform-liquid-import-to-string',
  fixtures: path.join(__dirname, '__fixtures__'),
  tests: {
    /* your test objects */
  },
})
