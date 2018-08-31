import screenshot from '@/background/screenshot';
import * as sinon from 'sinon';

describe('screenshot.ts', () => {
  it('should capture full page screenshot by defualt', async () => {
    // return a dummy image
    browser.tabs.captureVisibleTab.resolves(
      // tslint:disable-next-line:max-line-length
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC',
    );

    const createObjectURLMock = sinon.mock();
    createObjectURLMock.returns('');
    URL.createObjectURL = createObjectURLMock;

    // return a download id
    browser.downloads.download.resolves(1);
    await screenshot();
    expect(browser.tabs.captureVisibleTab.calledOnce).toBe(true);

    expect(browser.downloads.download.calledOnce).toBe(true);
    expect(browser.downloads.download.calledAfter(browser.tabs.captureVisibleTab)).toBe(true);
  });
});
