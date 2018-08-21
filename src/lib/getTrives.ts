import { apiEndPoint } from './common';
import storage from './storage';

/**
 *
 * @param {[{link:String,fullLink:String}]} links
 * @returns {Promise<[{link:String,score:String}]|any>} empty array if nothing found, cached scores otherwise
 */
const checkLocalCache = async (links) => {
  const results = [{}];
  const scoreCaches = await storage.scoreCache.get(null);

  links.forEach((elm) => {
    if (Object.prototype.hasOwnProperty.call(scoreCaches, elm.fullLink)) {
      results.push({
        link: elm.link,
        score: scoreCaches[elm.fullLink],
      });
    }
  });

  return results;
};

/**
 *
 * @param {[{link:String,fullLink:String}]} links
 * @returns {Promise<[{link:String,score:String}]|[]>} empty array if nothing found, cached scores otherwise
 */
const checkServer = async (links) => {
  const results = [{}];

  try {
    const res = await fetch(apiEndPoint('/wp-json/trive-engine/v2/weblink'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(links),
    });

    /**
     *  @var {[{weblink:String, avg_score:String}]} scores
     * */
    const {
      scores = [],
    } = await res.json();

    scores.forEach(async (elm) => {
      results.push({
        link: elm.weblink,
        score: elm.avg_score,
      });

      // Update storage scoreCache
      if (!Number.isNaN(Number.parseInt(elm.avg_score, 10))) {
        await storage.scoreCache.set(elm.weblink, elm.avg_score);
      }
    });
  } catch (e) {
    // todo re-throw the exception, catch & show user-friendly message on UI
    console.log(
      `Exception happened: ${e}
    While fetching scores from server: ${JSON.stringify(links)}`,
    );
  }

  return results;
};
/**
 * @param {[{link:String,score:String}]} scores
 * */
const updateCache = async (scores) => { };

/**
 *
 * todo check the scoresCache first transparent
 * fixme update the corresponding api
 * fixme check for single links wih only `fullLink` property
 *
 * @param {[{link:String,fullLink:String}]}links links to get score for
 * @returns {Promise<[{link:String,score:String}]>} array of objects with `link` and `score`
 *  properties
 *  or array with single object with empty values if no links found in the database or failure.
 */

const getTrives = async (links) => {
  if (links.length) {
    const cachePromise = checkLocalCache(links);
    const serverPromise = checkServer(links);
    const cache = await cachePromise;
    const server = await serverPromise;
  }

  /**
   *
   * @param {String}link
   * @param {[{link:String,score:String}]}cache
   * @param {[{link:String,score:String}]}server
   * */
  const getTrive = async (link, cache, server) => {
    const isCached = cache.some(elm => link === elm.link);
    if (isCached) return cache;
  };

  return [{
    link: '',
    score: '',
  }];
};
export default getTrives;
