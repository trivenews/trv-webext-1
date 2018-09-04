/**
 * __Mutates__ the provided `obj` by applying `changes` at depth `keys`
 * @param keys in the order of depth, give *empty* array or array with *single* element for flat objects,
 * the first key is considered as obj name and thus never utilized
 * @param obj to __mutate__
 * @param changes to apply
 *
 * @internal
 */
export const updateObj = (keys: string[], obj: object, changes: object) => {
  // todo figure out a better way without mutating function parameters.
  //       workaround could be to deepClone the `obj`, make changes, return the clone.
  if (keys.length > 1) {
    // Prevent mutation of `keys` array, it may be in use in the calling function
    const traverse = [...keys];
    traverse.shift();
    // Leveraging the fact that javascript doesn't actually deepClone objects 😏.
    const pointer = traverse.reduce((accumulator: Object, currentValue: any) => {
      if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
      return accumulator[currentValue];
    }, obj);
    Object.keys(changes).forEach(property => {
      pointer[property] = changes[property];
    });
  } else {
    Object.keys(changes).forEach(property => {
      obj[property] = changes[property];
    });
  }
};

/**
 *
 * @param name of the obj to retrieve
 * @returns the actual object if found, empty object otherwise
 */
const getStorageObj = async (name: string): Promise<Object> => (await browser.storage.local.get())[name] || {};

/**
 * Updates the properties of object found at `path` in local storage
 * by applying `changes`
 *
 * @param path to the object to update separated by `.`
 *
 * @param changes object containing only changed properties
 *
 * @internal
 */
export const updateStorageObj = async (path: string, changes: object) => {
  const keys = path.startsWith('$$') ? [path] : path.split('.');
  const obj = await getStorageObj(keys[0]);

  updateObj(keys, obj, changes);

  await browser.storage.local.set({
    [keys[0]]: obj,
  });
};

/**
 * scoreCache is a flat object with keys as url & property as score.
 */
const scoreCache = {
  /**
   * @param {!String}url
   * @param {!Number}score
   * @example scoreCache.set('https://theAnswerToLife.Is', 42);
   */
  set: async (url: string, score: number) =>
    updateStorageObj('scoreCache', {
      [url]: score,
    }),
  /**
   * @param {!String} url
   * @returns {Promise<Number|Object>} score if exists, cached at timestamp if under research,
   * if `url` not specified returns the whole scoreCache object, `NaN` otherwise
   * @example scoreCache.get('https://theAnswerToLife.Is')
   * will return 42;
   */
  get: async (url: string): Promise<number | object> => {
    const scoreCaches = await getStorageObj('scoreCache');
    if (!url) return scoreCaches;
    return scoreCaches[url] || NaN;
  },
};

/**
 * formCache is a top-level object with keys as url & property as an object with fields.
 */
const formCache = {
  /**
   *
   * @example formCache.set('https://theAnswerToLife.Is', {field1:'value'});
   */
  set: async (url: string, fields: Object) => updateStorageObj('$$' + url, fields),

  /**
   *
   * @returns {Promise<Object>} fields if exists, `{}` otherwise
   * @example formCache.get('https://theAnswerToLife.Is')
   * will return {field1:'value'};
   */
  get: async (url: string): Promise<object> => {
    const formCache: Object = await getStorageObj('$$' + url);

    return formCache;
  },
};

/**
 *
 * @param obj inside `config` can be one of `['settings','popup','content','background'] `
 * if not specified returns the whole config object
 * @param key property of `obj` to access
 * @param defaultValue to return if nothing found
 * @returns {Promise<any|undefined>} value if found, `defaultValue` if specified, `undefined` otherwise.
 */
const getConfig = async (obj: string, key: string, defaultValue: any = undefined): Promise<any | undefined> => {
  const config = await getStorageObj('config');

  // This will never happen! duh.. 🤦♂
  // if (!obj || ['settings', 'popup', 'content', 'background'].indexOf(obj) === -1) return config;

  // Make sure not trying to access a property of undefined
  if (Object.prototype.hasOwnProperty.call(config, obj)) {
    // No need to check if config[obj][key] exists since its the last in chain
    return !key ? config[obj] : config[obj][key];
  }
  return defaultValue;
};

/**
 * todo config.settings would've simply just worked 🤦♂
 *
 */
const config = {
  settings: {
    /**
     *
     * @example storage.config.settings.set ('settingName1', 'settingsValue1');
     */
    set: async (key: string, value: string) =>
      updateStorageObj('config.settings', {
        [key]: value,
      }),
    /**
     * @param key to access
     * @returns {Promise<any|undefined>} value if found, if `key` not specified returns the whole settings object,
     *  `undefined` otherwise.
     */
    get: async (key: string): Promise<any | undefined> => getConfig('settings', key),
  },
  popup: {
    /**
     * @param {!String} key
     * @param {String|Object} value
     */
    set: async (key: string, value: string | object) =>
      updateStorageObj('config.popup', {
        [key]: value,
      }),
    /**
     * @param {!String} key to access
     * @returns {Promise<any|undefined>} value if found, if `key` not specified returns the whole popup object,
     *  `undefined` otherwise.
     */
    get: async (key: string): Promise<any | undefined> => getConfig('popup', key),
  },
  content: {
    /**
     * @param {!String} key
     * @param {String|Object} value
     */
    set: async (key: string, value: string | object) =>
      updateStorageObj('config.content', {
        [key]: value,
      }),
    /**
     * @param {!String} key to access
     * @returns {Promise<any|undefined>} value if found, if `key` not specified returns the whole content object,
     *  `undefined` otherwise.
     */
    get: async (key: string): Promise<any | undefined> => getConfig('content', key),
  },
  background: {
    /**
     * @param {!String} key
     * @param {String|Object} value
     */
    set: async (key: string, value: string | object) =>
      updateStorageObj('config.background', {
        [key]: value,
      }),
    /**
     * @param {!String} key to access
     * @returns {Promise<any|undefined>} value if found, if `key` not specified returns the whole background object,
     *  `undefined` otherwise.
     */
    get: async (key: string): Promise<any | undefined> => getConfig('background', key),
  },
};

/**
 * Uses browser.storage.local.get/set under the hood so usual gotchas apply
 *
 */
const storage = {
  scoreCache,
  formCache,
  config,
};

export default storage;
