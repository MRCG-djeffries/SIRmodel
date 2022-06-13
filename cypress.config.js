const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  chromeWebSecurity: true,
  defaultCommandTimeout: 10000,
  fixturesFolder: 'cypress/e2e/fixtures',
  screenshotsFolder: 'cypress/e2e/screenshots',
  videosFolder: 'cypress/e2e/videos',
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

      return {
        ...config,
        fixturesFolder: 'cypress/e2e/fixtures',
        specPattern: 'cypress/e2e/specs/**/*.{feature,features}',
        screenshotsFolder: 'cypress/e2e/screenshots',
        videosFolder: 'cypress/e2e/videos',
        supportFile: 'cypress/support/e2e.js',
      }
    },
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/specs/**/*.{feature,features}',
    supportFile: 'cypress/support/e2e.js',
  },
})
