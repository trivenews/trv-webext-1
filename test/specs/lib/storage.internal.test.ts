import { updateObj, updateStorageObj } from '@/lib/storage';
import * as browserMock from 'webextensions-api-fake';

describe('storage.js - updateObj', () => {
  it('can update properties of flat objects', () => {
    const testObj = {
      firstKey: 'firstValue',
      secondKey: 'secondValue',
    };
    const changes = {
      secondKey: 'secondChanged',
    };

    updateObj([], testObj, changes);

    expect(testObj.secondKey).toBe('secondChanged');

    updateObj([], testObj, {
      thirdKey: 'thirdKey',
    });
    expect(testObj.firstKey).toBe('firstValue');

    expect(testObj.secondKey).toBe('secondChanged');

    expect(testObj.thirdKey).toBe('thirdKey');
  });

  it('can update existing properties of nested objects', () => {
    const testObj = {
      firstKey: 'firstValue',
      secondKey: {
        nestedFirstKey: 'nestedFirstValue',
        nestedSecondKey: {
          nestedFirstProperty: 'nestedFirstValue',
          nestedSecondProperty: 'nestedSecondValue',
        },
      },
      thirdKey: 'thirdKey',
    };
    const changes = {
      nestedSecondProperty: 'nestedSecondChanged',
    };

    updateObj('testObj.secondKey.nestedSecondKey'.split('.'), testObj, changes);

    expect(testObj.firstKey).toBe('firstValue');
    expect(testObj.secondKey.nestedFirstKey).toBe('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedFirstProperty).toBe('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedSecondProperty).toBe('nestedSecondChanged');
    expect(testObj.thirdKey).toBe('thirdKey');
  });

  it('can add new properties in nested objects', () => {
    const testObj = {
      firstKey: 'firstValue',
      secondKey: {
        nestedFirstKey: 'nestedFirstValue',
        nestedSecondKey: {
          nestedFirstProperty: 'nestedFirstValue',
          nestedSecondProperty: 'nestedSecondValue',
        },
      },
      thirdKey: 'thirdKey',
    };
    const changes = {
      nestedThirdProperty: 'nestedThirdValue',
    };

    updateObj('testObj.secondKey.nestedSecondKey'.split('.'), testObj, changes);

    expect(testObj.firstKey).toBe('firstValue');
    expect(testObj.secondKey.nestedFirstKey).toBe('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedFirstProperty).toBe('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedSecondProperty).toBe('nestedSecondValue');
    expect(testObj.secondKey.nestedSecondKey.nestedThirdProperty).toBe('nestedThirdValue');
    expect(testObj.thirdKey).toBe('thirdKey');
  });
});

describe('storage.js - updateStorageObj', async () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserMock.default();
    // @ts-ignore
    global.browser = browser;
  });

  it('can apply changes to provided flat storage object', async () => {
    await updateStorageObj('scoreCache', {
      'https://www.theAnswerToLife.Is': 42,
    });
    await updateStorageObj('scoreCache', {
      'https://www.theAnswerToLife.IsNot': 55,
    });

    const { scoreCache } = await browser.storage.local.get();
    expect(scoreCache).toEqual({
      'https://www.theAnswerToLife.Is': 42,
      'https://www.theAnswerToLife.IsNot': 55,
    });
  });

  it('can apply changes to provided storage object path', async () => {
    await updateStorageObj('config.content', {
      showScoreOnLinks: true,
    });
    await updateStorageObj('config.content', {
      cacheScores: true,
    });

    const { config } = await browser.storage.local.get();
    expect(config.content).toEqual({
      showScoreOnLinks: true,
      cacheScores: true,
    });
  });
});
