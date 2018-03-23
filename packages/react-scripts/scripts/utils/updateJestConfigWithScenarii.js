const path = require('path');

module.exports = (jestConfiguration, resolve, rootDir) => {
    let config = { ...jestConfiguration };
    
    config.testMatch = [...config.testMatch, '<rootDir>/src/**/*.feature'];
    config.transform = {
        '^.+\\.feature$': resolve('config/jest/gherkinTransform.js'),
        ...config.transform
    };
    config.moduleFileExtensions = [...config.moduleFileExtensions, 'feature'];

    return config;
}