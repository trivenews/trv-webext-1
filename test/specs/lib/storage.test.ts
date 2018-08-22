import * as browserMock from 'webextensions-api-fake';

import storage from '@/lib/storage';

describe('storage.js - storage.scoreCache', () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can cache URL score', async () => {
    await storage.scoreCache.set('https://www.theAnswerToLife.Is', 42);

    const score = await storage.scoreCache.get('https://www.theAnswerToLife.Is');

    expect(score).toBe(42);
  });

  it('does not override scoreCache object', async () => {
    await storage.scoreCache.set('https://www.theAnswerToLife.Is', 42);
    await storage.scoreCache.set('https://www.theAnswerToLife.IsNot', 55);

    const score1 = await storage.scoreCache.get('https://www.theAnswerToLife.Is');
    const score2 = await storage.scoreCache.get('https://www.theAnswerToLife.IsNot');

    expect(score1).toBe(42);
    expect(score2).toBe(55);
  });

  it('returns full scoreCache object if url not specified', async () => {
    await storage.scoreCache.set('https://www.theAnswerToLife.Is', 42);
    await storage.scoreCache.set('https://www.theAnswerToLife.IsNot', 55);
    const scoreCaches = await storage.scoreCache.get(null);
    expect(scoreCaches).toEqual({
      'https://www.theAnswerToLife.Is': 42,
      'https://www.theAnswerToLife.IsNot': 55,
    });
  });

  it('returns NaN when no score found', async () => {
    const score = await storage.scoreCache.get('https://www.theAnswerToLife.Is');

    expect(score).toEqual(NaN);
  });
});

describe('storage.js - storage.config.settings', () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can store settings', async () => {
    await storage.config.settings.set('settingName1', 'settingsValue1');

    const settingName1 = await storage.config.settings.get('settingName1');

    expect(settingName1).toBe('settingsValue1');
  });

  it('does not override settings object', async () => {
    await storage.config.settings.set('settingName1', 'settingsValue1');
    await storage.config.settings.set('settingName2', 'settingsValue2');

    const settingName1 = await storage.config.settings.get('settingName1');
    const settingName2 = await storage.config.settings.get('settingName2');

    expect(settingName1).toBe('settingsValue1');
    expect(settingName2).toBe('settingsValue2');
  });

  it('returns undefined if property not found', async () => {
    const settingName2 = await storage.config.settings.get('settingName2');
    expect(settingName2).toBe(undefined);
  });

  it('returns the whole settings object if key not specified', async () => {
    await storage.config.settings.set('settingName1', 'settingsValue1');

    const settingsObject = await storage.config.settings.get(null);

    expect(settingsObject).toEqual({
      settingName1: 'settingsValue1',
    });
  });
});
describe('storage.js - storage.config.popup', () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can store popup settings', async () => {
    await storage.config.popup.set('settingName1', 'settingsValue1');

    const settingName1 = await storage.config.popup.get('settingName1');

    expect(settingName1).toBe('settingsValue1');
  });

  it('does not override popup settings object', async () => {
    await storage.config.popup.set('settingName1', 'settingsValue1');
    await storage.config.popup.set('settingName2', 'settingsValue2');

    const settingName1 = await storage.config.popup.get('settingName1');
    const settingName2 = await storage.config.popup.get('settingName2');

    expect(settingName1).toBe('settingsValue1');
    expect(settingName2).toBe('settingsValue2');
  });

  it('returns undefined if property not found', async () => {
    const settingName2 = await storage.config.popup.get('settingName2');
    expect(settingName2).toBe(undefined);
  });

  it('returns the whole popup settings object if key not specified', async () => {
    await storage.config.popup.set('settingName1', 'settingsValue1');

    const settingsObject = await storage.config.popup.get(null);

    expect(settingsObject).toEqual({
      settingName1: 'settingsValue1',
    });
  });
});
describe('storage.js - storage.config.content', () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can store content settings', async () => {
    await storage.config.content.set('settingName1', 'settingsValue1');

    const settingName1 = await storage.config.content.get('settingName1');

    expect(settingName1).toBe('settingsValue1');
  });

  it('does not override content settings object', async () => {
    await storage.config.content.set('settingName1', 'settingsValue1');
    await storage.config.content.set('settingName2', 'settingsValue2');

    const settingName1 = await storage.config.content.get('settingName1');
    const settingName2 = await storage.config.content.get('settingName2');

    expect(settingName1).toBe('settingsValue1');
    expect(settingName2).toBe('settingsValue2');
  });

  it('returns undefined if property not found', async () => {
    const settingName2 = await storage.config.content.get('settingName2');

    expect(settingName2).toBe(undefined);
  });

  it('returns the whole content settings object if key not specified', async () => {
    await storage.config.content.set('settingName1', 'settingsValue1');

    const settingsObject = await storage.config.content.get(null);

    expect(settingsObject).toEqual({
      settingName1: 'settingsValue1',
    });
  });
});
describe('storage.js - storage.config.background', () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can store background settings', async () => {
    await storage.config.background.set('settingName1', 'settingsValue1');

    const settingName1 = await storage.config.background.get('settingName1');

    expect(settingName1).toBe('settingsValue1');
  });

  it('does not override background settings object', async () => {
    await storage.config.background.set('settingName1', 'settingsValue1');
    await storage.config.background.set('settingName2', 'settingsValue2');

    const settingName1 = await storage.config.background.get('settingName1');
    const settingName2 = await storage.config.background.get('settingName2');

    expect(settingName1).toBe('settingsValue1');
    expect(settingName2).toBe('settingsValue2');
  });

  it('returns undefined if property not found', async () => {
    const settingName2 = await storage.config.background.get('settingName2');
    expect(settingName2).toBe(undefined);
  });

  it('returns the whole background settings object if key not specified', async () => {
    await storage.config.background.set('settingName1', 'settingsValue1');

    const settingsObject = await storage.config.background.get(null);

    expect(settingsObject).toEqual({
      settingName1: 'settingsValue1',
    });
  });
});
