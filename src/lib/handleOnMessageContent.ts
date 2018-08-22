import scoreCardComponent from './scoreCardComponent';

export default async function handleOnMessage(message) {
  if (Object.prototype.hasOwnProperty.call(message, 'linksWithScores')) {
    message.linksWithScores.forEach(elm => {
      const aElm = document.querySelectorAll(`a[href="${elm.link}"]`);
      aElm.forEach(element => {
        if (element.firstChild) {
          const div = document.createElement('div');
          div.innerHTML = scoreCardComponent(elm.score);
          element.insertBefore(div, element.firstChild);
        }
      });
    });
    return true;
  }
  return true;
}
