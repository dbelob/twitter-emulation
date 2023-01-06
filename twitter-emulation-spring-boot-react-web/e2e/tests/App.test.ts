import puppeteer, { Browser, Page } from 'puppeteer';
import { getApplicationTitleText, getTitleText } from './app.po';

describe('App', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();

        await page.goto('http://localhost:3000');
    }, 30_000);

    afterAll(async () => await browser.close());

    test('should open application', async () => {
        expect(await getApplicationTitleText(page)).toBe('Twitter (React)');
    });

    test('should display login page', async () => {
        expect(await getTitleText(page)).toBe('Log in');
    });
});
