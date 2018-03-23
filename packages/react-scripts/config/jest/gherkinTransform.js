'use strict';

const gherkin = require('gherkin');
const GherkinFilePreprocessor = require('./GherkinFilePreprocessor');
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction');
const tsJestPreprocessor = require('ts-jest/preprocessor');

module.exports = {
  canInstrument: true,
  process: (src, filePath, jestConfig, transformOptions) => {
    return tsJestPreprocessor.process(new GherkinFilePreprocessor().process(src, filePath), filePath + ".impl.ts", jestConfig, transformOptions);
  },
  getCacheKey: (src, filename, configString, _ref) => {
    let parser = new gherkin.Parser();
    let feature = parser.parse(src);
    let impl = new GherkinFilePreprocessor().getFeatureImpl(feature.feature, filename);
    var files = [__filename, filename];
    if (impl) { files.push(impl.filename); }
    return createCacheKeyFunction(files)(
      src,
      filename,
      configString, _ref);
  }
};