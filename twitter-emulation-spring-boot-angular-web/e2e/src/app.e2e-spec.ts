import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

const mockServer = require("mockttp").getLocal();

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  beforeEach(() => mockServer.start(8080));
  afterEach(() => mockServer.stop());

  it('should display welcome message', () => {
    mockServer.get("/api/authentication/user").thenReply(200);

    page.navigateTo();
    expect(page.getTitleText()).toEqual('Log in');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
