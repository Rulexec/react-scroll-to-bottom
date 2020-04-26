import '@babel/standalone';
import 'regenerator-runtime';

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMTestUtils from 'react-dom/test-utils';
import ReactScrollToBottom from 'react-scroll-to-bottom';

import { timeouts } from './constants';
import * as conditions from './conditions/index';
import * as elements from './elements/index';
import * as host from './host/index';
import * as jobs from './jobs';
import * as pageObjects from './pageObjects/index';
import pageError from './host/pageError';
import parseURLParams from './utils/parseURLParams';
import runAsyncInterval from './utils/runAsyncInterval';
import sleep from './utils/sleep';
import subscribeConsole, { getHistory as getConsoleHistory } from './utils/subscribeConsole';

window.React = React;
window.ReactDOM = ReactDOM;
window.ReactDOMTestUtils = ReactDOMTestUtils;
window.ReactScrollToBottom = ReactScrollToBottom;

const log = console.log.bind(console);

// If not running under WebDriver, we handle all jobs here.
const webDriverMode = 'wd' in parseURLParams(location.hash);

if (!webDriverMode) {
  runAsyncInterval(async () => {
    const job = jobs.acquire();

    if (job) {
      const { id, type } = job;
      let result;

      switch (type) {
        case 'console':
          log(`Test: [${job.payload.level}] ${job.payload.args.join('\n')}`);
          break;

        case 'done':
          log('Test: Done.');
          break;

        case 'snapshot':
          log('Test: Taking a snapshot.');
          await sleep(500);
          break;

        case 'save file':
          result = URL.createObjectURL(new Blob([decode(job.payload.base64)]));
          log(`Test: Saving "${job.payload.filename}" to "${result}".`);
          break;

        default:
          log(`Test: Auto-resolving job "${type}".`);
          break;
      }

      jobs.resolve(id, result);
    }
  }, 100);
} else {
  window.addEventListener('error', ({ error }) => jobs.post(pageError(error)));
}

subscribeConsole();

!webDriverMode && console.warn('Test: Running without Web Driver, will mock all host functions.');

export {
  conditions,
  elements,
  expect,
  getConsoleHistory,
  host,
  jobs,
  pageObjects,
  parseURLParams,
  timeouts
};
