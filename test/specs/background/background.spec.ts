import '@/background';
import * as sinon from 'sinon';

describe('background page', () => {
  beforeEach(() => {
    browser.tabs.captureVisibleTab.resetHistory();
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
  });

  it('should set up a listener', () => {
    expect(browser.runtime.onMessage.addListener.calledOnce).toBe(true);
  });

  it('should capture and save screenshot', () => {
    browser.runtime.onMessage.dispatch({ action: 'capture-and-save' });

    expect(browser.tabs.captureVisibleTab.calledOnce).toBe(true);
    // fake awaiting
    process.nextTick(() => {
      expect(browser.downloads.download.calledOnce).toBe(true);
    });
  });

  it('should capture screenshot', () => {
    browser.runtime.onMessage.dispatch({ action: 'capture-only' });

    expect(browser.tabs.captureVisibleTab.calledOnce).toBe(true);
  });

  it('should save screenshot', () => {
    browser.runtime.onMessage.dispatch({ action: 'save-only' });

    expect(browser.downloads.download.calledOnce).toBe(true);
  });
});
