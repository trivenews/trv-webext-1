import processLinks from './processLinks';
import handleOnMessageContent from './handleOnMessageContent';

window.addEventListener('load', () => {
  processLinks((uniqueLinks) => {
    const links: [{ link?: string, fullLink?: string }] = [{}];
    for (let i = 0; i < uniqueLinks.length; i += 1) {
      links.push({
        link: uniqueLinks[i].getAttribute('href'),
        fullLink: uniqueLinks[i].href,
      });
    }
    browser.runtime.sendMessage({
      links,
    });
  });
});

browser.runtime.onMessage.addListener(handleOnMessageContent);
