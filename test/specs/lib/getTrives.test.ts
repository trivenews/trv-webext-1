import * as browserMocks from 'webextensions-api-fake';
import * as browserStubs from 'sinon-chrome';
import getTrives from '@/lib/getTrives';

/**
 * @type {browserStubs}
 */
const browser = browserMocks();

describe('getTrives.js', () => {
  beforeAll(() => {
    // @ts-ignore
    global.browser = browser;
  });
  it('can return trive for a single url', async () => {
    const googleScore = await getTrives([{
      link: '',
      fullLink: 'https://google.com',
    }]);
    const noneScore = await getTrives([{
      link: '',
      fullLink: '',
    }]);
    expect(googleScore[0].score).toBe('');
    expect(noneScore[0].score).toBe('');
  });
});
