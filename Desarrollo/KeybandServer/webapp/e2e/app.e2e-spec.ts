import { Keyband2Page } from './app.po';

describe('keyband2 App', function() {
  let page: Keyband2Page;

  beforeEach(() => {
    page = new Keyband2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
