import getTrives from './getTrives';

/**
 * @param sendResponse is a callback given by the browser api to call
 * when response is ready to send back to the callee
 */
export default async function handleOnMessage(message, _, sendResponse) {
  if (Object.prototype.hasOwnProperty.call(message, 'links')) {
    const scores = await getTrives(message.links);
    sendResponse({
      linksWithScores: scores,
    });
    return true;
  }
  return true;
}
