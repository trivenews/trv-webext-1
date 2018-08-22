/**
 * @param {HTMLAnchorElement} e
 */
function isValidLink(e) {
  return (
    e.href.startsWith('https://') &&
    e.innerHTML.trim() &&
    e.innerText.trim() &&
    !e.getAttribute('href').startsWith('#') &&
    !e.getAttribute('href').startsWith('/')
  );
}
/**
 *
 * @param {HTMLAnchorElement} e
 * @param {Number} i
 * @param {HTMLAnchorElement[]} arr
 */
function isUniqueLink(e, i, arr) {
  for (let j = i + 1, len = arr.length; j < len; j += 1) {
    if (e.getAttribute('href') === arr[j].getAttribute('href')) return false;
  }
  return true;
}

/**
 * @param {function} callback to call with unique links
 * @returns {Promise<any>} return value of the callback.
 */
export default async function processLinks(callback) {
  if (typeof callback !== 'function') return false;

  const anchorTags = document.getElementsByTagName('a');

  const uniqueLinks = [...anchorTags.values()].filter((e, i, arr) => isValidLink(e) && isUniqueLink(e, i, arr));
  return callback(uniqueLinks);
}
