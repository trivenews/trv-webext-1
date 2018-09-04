/**
 * @param {HTMLAnchorElement} e
 */
function isValidLink(e: HTMLAnchorElement) {
  return (
    e.href.startsWith('https://') &&
    e.innerHTML.trim() &&
    e.innerText.trim() &&
    // @ts-ignore
    !e.getAttribute('href').startsWith('#') &&
    // @ts-ignore
    !e.getAttribute('href').startsWith('/')
  );
}

/**
 *
 * @param {HTMLAnchorElement} e
 * @param {Number} i
 * @param {HTMLAnchorElement[]} arr
 */
function isUniqueLink(e: HTMLAnchorElement, i: number, arr: HTMLAnchorElement[]) {
  for (let j = i + 1, len = arr.length; j < len; j += 1) {
    if (e.getAttribute('href') === arr[j].getAttribute('href')) return false;
  }
  return true;
}

/**
 * @param {function} callback to call with unique links
 * @returns {Promise<any>} return value of the callback.
 */
export default async function processLinks(callback: Function): Promise<any> {
  if (typeof callback !== 'function') return false;

  const anchorTags = document.getElementsByTagName('a');

  const anchorTagsValues: any[] = [];

  Array.from(anchorTags).forEach(e => anchorTagsValues.push(e));

  const uniqueLinks = [...anchorTagsValues].filter((e, i, arr) => isValidLink(e) && isUniqueLink(e, i, arr));
  return callback(uniqueLinks);
}
