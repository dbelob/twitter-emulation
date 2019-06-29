import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { IHttpBackendService } from 'angular';
import 'angular-mocks';

describe('workspace-project App', () => {
  let $httpBackend: IHttpBackendService;
  let page: AppPage;

  beforeEach(inject((
    _$httpBackend_: IHttpBackendService,
  ) => {
    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET('api/authentication/user').respond(200, []);
  }));

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
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
