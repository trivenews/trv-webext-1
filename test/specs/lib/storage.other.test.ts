import * as browserFake from 'webextensions-api-fake';
import * as browserReal from 'sinon-chrome';

// import reload from 'require-reload';
import storage from '@/lib/storage';

/**
 * @type {browserReal}
 */
const browser = browserFake();
const constants = 1;
describe('moduleName', () => {
  beforeAll(() => {
    // @ts-ignore
    global.browser = browser;
  });
  it('does something', () => {
    browser.tabs.create({
      url: 'https://theAnswerToLife.Is',
    });
    browser.tabs.create({
      url: 'https://theAnswerToLife.Is',
    });

    expect(browser.tabs.create.calledTwice).toBe(true);

    expect(constants).toBe(1);
  });
});

/* describe('storage.js - updateObj', () => {
  it('can update properties of flat objects', () => {
    const testObj = {
      firstKey: 'firstValue',
      secondKey: 'secondValue',
    };
    const changes = {
      secondKey: 'secondChanged',
    };

    updateObj([], testObj, changes);

    expect(testObj.secondKey).to.be.equal('secondChanged');

    updateObj([], testObj, {
      thirdKey: 'thirdKey',
    });
    expect(testObj.firstKey).to.be.equal('firstValue');

    expect(testObj.secondKey).to.be.equal('secondChanged');

    expect(testObj.thirdKey).to.be.equal('thirdKey');
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

    expect(testObj.firstKey).to.be.equal('firstValue');
    expect(testObj.secondKey.nestedFirstKey).to.be.equal('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedFirstProperty).to.be.equal('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedSecondProperty).to.be.equal('nestedSecondChanged');
    expect(testObj.thirdKey).to.be.equal('thirdKey');
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

    expect(testObj.firstKey).to.be.equal('firstValue');
    expect(testObj.secondKey.nestedFirstKey).to.be.equal('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedFirstProperty).to.be.equal('nestedFirstValue');
    expect(testObj.secondKey.nestedSecondKey.nestedSecondProperty).to.be.equal('nestedSecondValue');
    expect(testObj.secondKey.nestedSecondKey.nestedThirdProperty).to.be.equal('nestedThirdValue');
    expect(testObj.thirdKey).to.be.equal('thirdKey');
  });
}); */

/* describe('storage.js - updateStorageObj', async () => {
  beforeEach(() => {
    // New browser for each test
    browser = browserFake();
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

    const {
      scoreCache,
    } = await browser.storage.local.get();
    expect(scoreCache).to.be.equal({
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

    const {
      config,
    } = await browser.storage.local.get();
    expect(config.content).to.be.equal({
      showScoreOnLinks: true,
      cacheScores: true,
    });
  });
}); */
