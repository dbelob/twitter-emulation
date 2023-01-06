import puppeteer, { Browser, Page } from 'puppeteer';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getApplicationTitleText, getTitleText } from './app.po';

describe('App', () => {
    let browser: Browser;
    let page: Page;

    const server = setupServer(
        rest.get('/api/authentication/user', (req, res, ctx) => {
            return res(ctx.status(200));
        })
    );

    beforeAll(async () => {
        server.listen();

        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();

        await page.goto('http://localhost:3000');
    }, 30_000);

    afterEach(() => server.resetHandlers());

    afterAll(async () => {
        await browser.close();
        server.close();
    });

    test('should open application', async () => {
        expect(await getApplicationTitleText(page)).toBe('Twitter (React)');
    });

    test('should display login page', async () => {
        expect(await getTitleText(page)).toBe('Log in');
    });
});
