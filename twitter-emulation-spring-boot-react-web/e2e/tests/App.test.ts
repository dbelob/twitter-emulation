import puppeteer, { Browser, Page } from 'puppeteer';
import { getPageHeaderText, getPageTitleText, navigateTo } from './app.po';

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

    it('should open application', async () => {
        await navigateTo(page, baseUrl);
        expect(await getPageTitleText(page)).toBe('Twitter (React)');
    });

    it('should display login page', async () => {
        await navigateTo(page, baseUrl);
        expect(await getPageHeaderText(page)).toBe('Login');
    });
});
