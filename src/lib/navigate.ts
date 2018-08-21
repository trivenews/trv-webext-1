export const navigationTarget = {
  NEW_WINDOW: 'new-window',
  NEW_TAB: 'new-tab',
  CURRENT_TAB: 'current-tab',
};

/**
 * Navigate user
 * @param {String} url
 * @param {String} [target]
 * @returns {*}
 */
export function navigate(url, target = navigationTarget.NEW_TAB) {
  switch (target) {
    case navigationTarget.NEW_WINDOW:
      return browser.windows.create({
        url,

        type: 'normal',
      });

    case navigationTarget.CURRENT_TAB:
    default:
      return browser.tabs.create({
        url,
        active: true,
      });
  }
}
