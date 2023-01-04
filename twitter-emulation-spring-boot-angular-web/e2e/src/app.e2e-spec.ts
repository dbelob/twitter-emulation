import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

const mockServer = require('mockttp').getLocal();

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  beforeEach(() => mockServer.start(8080));
  afterEach(() => mockServer.stop());

  it('should display login page', () => {
    mockServer.forGet('/api/authentication/user').thenReply(200);

    page.navigateTo();
    expect(page.getTitleText()).toEqual('Log in');
  });

  it('should click button and display register page', () => {
    mockServer.forGet('/api/authentication/user').thenReply(200);

    page.navigateTo();
    page.getButtonById('register').click();
    expect(page.getTitleText()).toEqual('Registration');
  });

  it('should switch to register page and go back', () => {
    mockServer.forGet('/api/authentication/user').thenReply(200);

    page.navigateTo();
    page.getButtonById('register').click();
    expect(page.getTitleText()).toEqual('Registration');
    page.getButtonById('login').click();
    expect(page.getTitleText()).toEqual('Log in');
  });

  it('should display home page', () => {
    mockServer.forGet('/api/authentication/user').thenReply(200, '{\"name\": \"jsmith\"}');
    mockServer.forGet('/api/account/statistics/jsmith').thenReply(200, '' +
      '{"username":"jsmith","description":"John Smith","tweetsCount":6,"followingCount":2,"followersCount":1,"follow":false}');
    mockServer.forGet('/api/tweet/timeline').thenReply(200,
      '[{"username":"jdoe","description":"John Doe","text":"Tweet Text","date":"2019-07-03T20:19:21.495+0000"}]');

    page.navigateTo();
    expect(page.getDivByIdText('username')).toEqual('@jsmith');
    expect(page.getDivByIdText('description')).toEqual('John Smith');
  });

  it('should switch to profile page and go back', () => {
    mockServer.forGet('/api/authentication/user').thenReply(200, '{\"name\": \"jsmith\"}');
    mockServer.forGet('/api/account/statistics/jsmith').thenReply(200,
      '{"username":"jsmith","description":"John Smith","tweetsCount":6,"followingCount":2,"followersCount":1,"follow":false}');
    mockServer.forGet('/api/tweet/timeline').thenReply(200, '[' +
      '{"username":"jdoe","description":"John Doe","text":"Tweet Text 1","date":"2019-07-03T20:19:21.495+0000"},' +
      '{"username":"jsmith","description":"John Smith","text":"Tweet Text 2","date":"2019-07-03T20:19:21.489+0000"},' +
      '{"username":"jdoe","description":"John Doe","text":"Tweet Text 3","date":"2019-07-03T18:48:47.495+0000"}' +
      ']');
    mockServer.forGet('/api/account/accounts/jsmith').thenReply(200, '{"username":"jsmith","password":"password","description":"John Smith"}');

    page.navigateTo();
    expect(page.getDivByIdText('username')).toEqual('@jsmith');
    expect(page.getDivByIdText('description')).toEqual('John Smith');
    page.getButtonById('profile').click();
    expect(page.getTitleText()).toEqual('Profile');
    page.getButtonById('cancel').click();
    expect(page.getDivByIdText('username')).toEqual('@jsmith');
    expect(page.getDivByIdText('description')).toEqual('John Smith');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
