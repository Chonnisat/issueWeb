import { IMSWebPage } from './app.po';

describe('imsweb App', () => {
  let page: IMSWebPage;

  beforeEach(() => {
    page = new IMSWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
