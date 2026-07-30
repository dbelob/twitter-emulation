import { Page } from 'puppeteer';

const rootSelector = 'app-root';
const pageHeaderSelector = 'h3';

export const navigateTo = async (page: Page, baseUrl: string) => {
    await page.goto(baseUrl);
};

export const root = async (page: Page) => await page.$(rootSelector);

export const getPageTitleText = async (page: Page) => await page.title();

export const getPageHeaderText = async (page: Page) => {
    const app = await root(page);

    if (!app) {
        throw new Error('Can\'t root node');
    }

    await page.waitForSelector(pageHeaderSelector);

    return await app.$eval(pageHeaderSelector, (el: any) => el.innerText);
};
