import '@/background';
describe('background page', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => jest.useRealTimers());

  it('should set up a listener', () => {
    expect(browser.runtime.onMessage.addListener.calledOnce).toBe(true);
  });
});
