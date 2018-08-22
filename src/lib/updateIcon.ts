import { themeColors, grayIcon, defaultIcon } from './common';

/**
 * Updates extension icon and badge for a given `tabId`
 *
 * @export
 * @param {{tabId:Number,title?:String,badgeText?:String,badgeColor?:String,disable?:boolean,}}any
 * @returns {Promise<boolean>} true on success, false on failure
 */
export default async function updateIcon({
  tabId,
  title = 'Trive it!',
  badgeText = '!',
  badgeColor = themeColors.default,
  disable = false,
}) {
  const tooltip = browser.browserAction.setTitle({
    tabId,
    title: disable ? 'Trive not available on this page' : title,
  });
  const text = browser.browserAction.setBadgeText({
    tabId,
    text: disable ? '' : badgeText,
  });
  const bg = browser.browserAction.setBadgeBackgroundColor({
    tabId,
    color: badgeColor,
  });
  const icon = browser.browserAction.setIcon({
    tabId,
    path: disable ? grayIcon : defaultIcon,
  });
  const popup = browser.browserAction.setPopup({
    tabId,
    popup: disable ? '' : 'popup.html',
  });

  try {
    await tooltip;
    await text;
    await bg;
    await icon;
    await popup;
  } catch (error) {
    return false;
  }

  return true;
}
