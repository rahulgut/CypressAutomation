const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

async function setupNodeEvents(on, config) {

  config.db= {
    userName: "azure",
    password: "Azure!10",
    server: "rsadbdemo2.database.windows.net",
    options: {
        database: "rahulshettyacademy",
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
  }
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  // SQL server configuration
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  //Task for excel to json
  on('task', {
    excelToJsonConverter(filePathExcel) {
      const result = excelToJson({
      source: fs.readFileSync(filePathExcel) // fs.readFileSync return a Buffer
      })
      return result
    }
  })

return config;
}

module.exports = defineConfig({
  projectId: '7n5r3i',
  video: true,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 65000,
  //chromeWebSecurity: false,
  env: {
    url: 'https://rahulshettyacademy.com'
  },
  retries: {
    runMode: 1
  },
  e2e: {
    setupNodeEvents,
    //specPattern: 'cypress/e2e/*.js'
    specPattern: 'cypress/BDD/*.feature'
  },
});
