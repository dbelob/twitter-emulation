import * as puppeteer from 'puppeteer';
import * as mockttp from 'mockttp';

const baseUrl = process.env['baseUrl'] ?? 'http://localhost:4200/';
let server: mockttp.Mockttp;
let browser: puppeteer.Browser;
let page: puppeteer.Page;

export function setupBrowserHooks(path = ''): void {
  beforeAll(async () => {
    // 1. Start Mockttp local proxy server
    server = mockttp.getLocal();
    await server.start(8080);

    // 2. Mock an API endpoint used by Angular
    await server.forGet('/api/authentication/user').thenReply(200);

    // 3. Launch Puppeteer routed through the proxy
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${baseUrl}${path}`);
  });

  afterEach(async () => {
    await page?.close();
  });

  afterAll(async () => {
    await browser?.close();
    await server.stop();
  });
}

export function getBrowserState(): {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  baseUrl: string;
} {
  if (!browser) {
    throw new Error(
      'No browser state found! Ensure `setupBrowserHooks()` is called.'
    );
  }
  return {
    browser,
    page,
    baseUrl,
  };
}
