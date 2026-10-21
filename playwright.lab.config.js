import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir:'./tests-lab-ui',
  outputDir:'./playwright-results/lab',
  timeout:60000,
  expect:{timeout:15000},
  workers:1,
  use:{
    baseURL:'http://127.0.0.1:8098',
    browserName:'chromium',
    channel:process.env.EMBODIED_TEST_CHANNEL,
    screenshot:'only-on-failure',
    trace:'retain-on-failure',
    launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']},
  },
  webServer:{
    command:`${process.env.EMBODIED_TEST_PYTHON || '.venv/bin/python'} -m embodied_rsi.cli --artifacts playwright-results/lab-data dashboard --port 8098`,
    env:{EMBODIED_JEV_PERSISTENCE:'memory'},
    url:'http://127.0.0.1:8098/api/simulation/capabilities',
    reuseExistingServer:false,
    timeout:30000,
  },
});
