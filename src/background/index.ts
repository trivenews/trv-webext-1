import screenshot, { saveFile } from './screenshot';
import { storage } from '../lib';

// import {
//   onActivated,
//   onUpdated,
// } from '../_lib/handleTabEvents';
// import handleIconClick from '../_lib/handleIconClick';
// import contextMenu from '../_lib/contextMenu';

// // listen from browserAction clicks
// browser.browserAction.onClicked.addListener(handleIconClick);

// // listen for bookmarks being created
// // browser.bookmarks.onCreated.addListener(handleTabChange);

// // listen for bookmarks being removed
// // browser.bookmarks.onRemoved.addListener(handleTabChange);

// // listen to tab URL changes
// browser.tabs.onUpdated.addListener(onUpdated);

// // listen to tab switching
// browser.tabs.onActivated.addListener(onActivated);

// // listen for window switching
// // browser.windows.onFocusChanged.addListener(handleTabChange);

// // update when the extension loads initially
// // handleTabChange();

// // browser.contextMenus.onClicked.addListener(contextMenu.handler);

// This is a fake method that sends fake scores and caches them
// ideally this would make a call to the server/IPFS
const fakeScores = async (links: [{ link: string; fullLink: string }]) => {
  const scores: any[] = [];

  // here for loop makes things sync so we wait for each link score
  // to be cached before adding it to the array
  for (const i of links) {
    await storage.scoreCache.set(i.fullLink, 0);
    scores.push({ link: i.link, score: '??' });
  }

  return scores;
};

browser.runtime.onMessage.addListener((message, sender) => {
  if (Object.prototype.hasOwnProperty.call(message, 'links')) {
    console.log('got links to fetch');
    // const scores = await getTrives(message.links);
    fakeScores(message.links).then(scores => {
      if (sender.tab) {
        browser.tabs.sendMessage(sender.tab.id || 0, {
          linksWithScores: scores,
        });
      }
    });

    return;
  }

  const backgroundMessage: BackgroundMessage = message;

  switch (backgroundMessage.action) {
    case 'capture-and-save':
      screenshot().then(saveFile);

      break;
    case 'capture-only':
      return screenshot();
    case 'save-only':
      saveFile(message.data);

      break;
    default:
      break;
  }
});

interface BackgroundMessage {
  action: BackgroundMessageAction;

  data?: any;
}
type BackgroundMessageAction = 'capture-and-save' | 'capture-only' | 'save-only';
