import { type JestPuppeteerConfig } from 'jest-environment-puppeteer';

const config: JestPuppeteerConfig = {
    launch: {
        headless: true
    }
};

export default config;
