// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const jest = require('jest');
const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watchAll');
}

// @remove-on-eject-begin
// This is not necessary after eject because we embed config into package.json.
const createJestConfig = require('./utils/createJestConfig');
const path = require('path');
const paths = require('../config/paths');
let jestConfiguration = createJestConfig(
  relativePath => path.resolve(__dirname, '..', relativePath),
  path.resolve(paths.appSrc, '..'),
  false
);
if (argv.indexOf('--withoutScenario') < 0) {
  const updateJestConfiguration = require('./utils/updateJestConfigWithScenarii');
  jestConfiguration = updateJestConfiguration(
    jestConfiguration,
    relativePath => path.resolve(__dirname, '..', relativePath),
    path.resolve(paths.appSrc, '..')
  );
} else {
  argv.splice(argv.indexOf('--withoutScenario'), 1);
}
argv.push(
  '--config',
  JSON.stringify(
    jestConfiguration
  )
);
// @remove-on-eject-end
jest.run(argv);
