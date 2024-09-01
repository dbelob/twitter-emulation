import puppeteer, { Browser, Page } from 'puppeteer';
import { getPageTitleText, navigateTo } from './app.po';

describe('App', () => {
    const baseUrl = 'http://localhost:5173';
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();
    }, 30_000);

    afterAll(async () => {
        await browser.close();
    });

    test('should open application', async () => {
        await navigateTo(page, baseUrl);
        expect(await getPageTitleText(page)).toBe('Twitter (React)');
    });
});
