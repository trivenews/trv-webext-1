const contextMenu = {
  register: async () => {
    const showScoreOnLinks = !!(await browser.storage.local.get('showScoreOnLinks'));
    const itemType: browser.contextMenus.ItemType = 'checkbox';
    const pageAction: browser.contextMenus.ContextType = 'page_action';
    const browserAction: browser.contextMenus.ContextType = 'browser_action';
    const menuItems = [
      {
        checked: showScoreOnLinks,
        id: 'showScoreOnLinks',
        type: itemType,
        title: 'Show scores on links',
        contexts: [browserAction],
      },
      {
        checked: false,
        id: 'alternateScoreColors',
        type: itemType,
        title: 'Use alternate score colors here',
        contexts: [pageAction],
      },
    ];

    menuItems.forEach(item => browser.contextMenus.create(item));
  },
  handler: async (info, tab) => {
    let alternateScoreColors;
    const menuId = info.menuItemId;
    switch (menuId) {
      case 'showScoreOnLinks':
        await browser.storage.local.set({
          showScoreOnLinks: info.checked,
        });
        break;
      case 'alternateScoreColors':
        alternateScoreColors = (await browser.storage.local.get('alternateScoreColors')) || [];
        alternateScoreColors.push(tab.url);
        await browser.storage.local.set({
          alternateScoreColors,
        });
        break;
      default:
    }
  },
};

export default contextMenu;
