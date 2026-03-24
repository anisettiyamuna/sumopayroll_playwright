const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  timeout: 30 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['html', { open: 'always' }],// open: 'always' / 'never' / 'on-failure'
  ],
  use: {
    browserName: 'chromium',
    //  baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'on',
    video: 'on',
  },
});
