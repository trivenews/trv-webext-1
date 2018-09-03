import screenshot, { saveFile } from './screenshot';

// import {
//   onActivated,
//   onUpdated,
// } from '../_lib/handleTabEvents';
// import handleIconClick from '../_lib/handleIconClick';
// import contextMenu from '../_lib/contextMenu';
// import handleOnMessageBackground from '../_lib/handleOnMessageBackground';

// // listen from browserAction clicks
// browser.browserAction.onClicked.addListener(handleIconClick);

// browser.runtime.onMessage.addListener(handleOnMessageBackground);

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

browser.runtime.onMessage.addListener(message => {
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
