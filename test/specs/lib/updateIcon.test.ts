import updateIcon from '@/lib/updateIcon';
import { themeColors, grayIcon, defaultIcon } from '@/lib/common';

const tabId = 1;

describe('updateIcon.js', () => {
  beforeEach(() => {
    browser.browserAction.setTitle.reset();
    browser.browserAction.setBadgeText.reset();
    browser.browserAction.setBadgeBackgroundColor.reset();
    browser.browserAction.setIcon.reset();
    browser.browserAction.setPopup.reset();
    // @ts-ignore
    global.browser = browser;
  });

  it('updates icon to default values with no args', async () => {
    const result = await updateIcon({
      tabId,
    });

    expect(result).toBe(true);
    expect(
      browser.browserAction.setTitle.withArgs({
        tabId,
        title: 'Trive it!',
      }).calledOnce,
    ).toBe(true);
    expect(
      browser.browserAction.setBadgeText.withArgs({
        tabId,
        text: '!',
      }).calledOnce,
    ).toBe(true);
    expect(
      browser.browserAction.setBadgeBackgroundColor.withArgs({
        tabId,
        color: themeColors.default,
      }).calledOnce,
    ).toBe(true);
    expect(
      browser.browserAction.setIcon.withArgs({
        tabId,
        path: defaultIcon,
      }).calledOnce,
    ).toBe(true);
    expect(
      browser.browserAction.setPopup.withArgs({
        tabId,
        popup: 'popup.html',
      }).calledOnce,
    ).toBe(true);
  });

  it('updates icon title to given value', async () => {
    const result = await updateIcon({
      tabId,
      title: 'loading...',
    });

    expect(result).toBe(true);
    expect(
      browser.browserAction.setTitle.withArgs({
        tabId,
        title: 'loading...',
      }).calledOnce,
    ).toBe(true);
  });

  it('updates badge text to given value', async () => {
    const result = await updateIcon({
      tabId,
      badgeText: '+23',
    });

    expect(result).toBe(true);
    expect(
      browser.browserAction.setBadgeText.withArgs({
        tabId,
        text: '+23',
      }).calledOnce,
    ).toBe(true);
  });

  it('updates badge background color to given value', async () => {
    const result = await updateIcon({
      tabId,
      badgeColor: themeColors.info,
    });

    expect(result).toBe(true);
    expect(
      browser.browserAction.setBadgeBackgroundColor.withArgs({
        tabId,
        color: themeColors.info,
      }).calledOnce,
    ).toBe(true);
  });

  it('can disable extension icon and popup', async () => {
    const result = await updateIcon({
      tabId,
      disable: true,
    });

    expect(result).toBe(true);
    expect(
      browser.browserAction.setIcon.withArgs({
        tabId,
        path: grayIcon,
      }).calledOnce,
    ).toBe(true);
    expect(
      browser.browserAction.setPopup.withArgs({
        tabId,
        popup: '',
      }).calledOnce,
    ).toBe(true);
  });

  it('returns false on failure to setTitle', async () => {
    browser.browserAction.setTitle.rejects();

    const result = await updateIcon({
      tabId,
    });

    expect(result).toBe(false);
  });

  it('returns false on failure to setBadgeText', async () => {
    browser.browserAction.setBadgeText.rejects();

    const result = await updateIcon({
      tabId,
    });

    expect(result).toBe(false);
  });

  it('returns false on failure to setIcon', async () => {
    browser.browserAction.setIcon.rejects();

    const result = await updateIcon({
      tabId,
    });

    expect(result).toBe(false);
  });

  it('returns false on failure to setPopup', async () => {
    browser.browserAction.setPopup.rejects();

    const result = await updateIcon({
      tabId,
    });

    expect(result).toBe(false);
  });

  it('returns false on failure to setBadgeBackgroundColor', async () => {
    browser.browserAction.setBadgeBackgroundColor.rejects();

    const result = await updateIcon({
      tabId,
    });

    expect(result).toBe(false);
  });
});
