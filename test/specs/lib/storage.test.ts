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

describe('storage.js - storage.formCache', () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can cache fields', async () => {
    await storage.formCache.set('https://www.theAnswerToLife.Is', { field: 'value' });

    const score = await storage.formCache.get('https://www.theAnswerToLife.Is');

    expect(score).toEqual({ field: 'value' });
  });

  it('does not override formCache object', async () => {
    await storage.formCache.set('https://www.theAnswerToLife.Is', { field: 'value' });
    await storage.formCache.set('https://www.theAnswerToLife.IsNot', { field: 'value2' });

    const score1 = await storage.formCache.get('https://www.theAnswerToLife.Is');
    const score2 = await storage.formCache.get('https://www.theAnswerToLife.IsNot');

    expect(score1).toEqual({ field: 'value' });
    expect(score2).toEqual({ field: 'value2' });
  });

  it('returns {} when no fields found', async () => {
    const score = await storage.formCache.get('https://www.theAnswerToLife.Is');

    expect(score).toEqual({});
  });
});

describe('storage.js - storage.config', () => {
  ['settings', 'popup', 'content', 'background'].forEach((settingType: string) => {
    describe(`${settingType}`, () => {
      beforeEach(() => {
        // New browser for each test
        browser = browserMock.default();
        // @ts-ignore
        global.browser = browser;
      });

      it(`can store ${settingType}`, async () => {
        await storage.config[settingType].set('settingName1', 'settingsValue1');

        const settingName1 = await storage.config[settingType].get('settingName1');

        expect(settingName1).toBe('settingsValue1');
      });

      it(`does not override ${settingType} object`, async () => {
        await storage.config[settingType].set('settingName1', 'settingsValue1');
        await storage.config[settingType].set('settingName2', 'settingsValue2');

        const settingName1 = await storage.config[settingType].get('settingName1');
        const settingName2 = await storage.config[settingType].get('settingName2');

        expect(settingName1).toBe('settingsValue1');
        expect(settingName2).toBe('settingsValue2');
      });

      it('returns undefined if property not found', async () => {
        const settingName2 = await storage.config[settingType].get('settingName2');
        expect(settingName2).toBe(undefined);
      });

      it(`returns the whole ${settingType} object if key not specified`, async () => {
        await storage.config[settingType].set('settingName1', 'settingsValue1');

        const settingsObject = await storage.config[settingType].get(null);

        expect(settingsObject).toEqual({
          settingName1: 'settingsValue1',
        });
      });
    });
  });
});
