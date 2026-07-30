import { setupBrowserHooks, getBrowserState } from './utils';
import { getPageHeaderText, getPageTitleText, navigateTo } from './app.po';

describe('App test', function() {
  setupBrowserHooks();

  it('is running', async function() {
    const { page } = getBrowserState();
    const element = await page.locator('::-p-text(Login)').wait();

    expect(element).not.toBeNull();
  });

  it('should open application', async () => {
    const { page, baseUrl } = getBrowserState();

    await navigateTo(page, baseUrl);
    expect(await getPageTitleText(page)).toBe('Twitter (Angular)');
  });

  it('should display login page', async () => {
    const { page, baseUrl } = getBrowserState();

    await navigateTo(page, baseUrl);
    expect(await getPageHeaderText(page)).toBe('Login');
  });
});
