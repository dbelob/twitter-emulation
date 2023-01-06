import { Page } from 'puppeteer';

const rootSelector = '#root';
const titleSelector = 'h3';

export const root = async (page: Page) => await page.$(rootSelector);

export const getApplicationTitleText = async (page: Page) => await page.title();

export const getTitleText = async (page: Page) => {
    const app = await root(page);

    if (!app) {
        throw new Error('Can\'t root node');
    }

    return await app.$eval(titleSelector, (el: any) => el.innerText);
};
