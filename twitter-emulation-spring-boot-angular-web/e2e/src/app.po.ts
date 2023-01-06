import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getPageTitleText() {
    return browser.getTitle() as Promise<string>;
  }

  getPageHeaderText() {
    return element(by.css('app-root h3')).getText() as Promise<string>;
  }

  getButtonById(id: string) {
    return element(by.css('button[id="' + id + '"]')) as ElementFinder;
  }

  getDivByIdText(id: string) {
    return element(by.css('div[id="' + id + '"]')).getText() as Promise<string>;
  }
}
