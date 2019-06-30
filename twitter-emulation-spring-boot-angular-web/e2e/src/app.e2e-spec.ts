import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import * as angular from 'angular';
import { IHttpBackendService } from 'angular';
import 'angular-mocks';

describe('workspace-project App', () => {
  let page: AppPage;
  let $httpBackend: IHttpBackendService;

  beforeEach(() => {
    angular
      .module('test', [])
      .service('appPage', AppPage);
    angular.mock.module('test');
  });

  // beforeEach(() => {
  //   page = new AppPage();
  // });

  beforeEach(inject((_$httpBackend_: IHttpBackendService, _appPage_: AppPage) => {
    $httpBackend = _$httpBackend_;
    page = _appPage_;

    $httpBackend.expectGET('api/authentication/user').respond(200, []);
  }));

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
