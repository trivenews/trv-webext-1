import storage from './storage';
const contextMenu = {
  register: async () => {
    const showScoreOnLinks = !!(await storage.config.content.get('showScoreOnLinks'));
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
      // {
      //   checked: false,
      //   id: 'alternateScoreColors',
      //   type: itemType,
      //   title: 'Use alternate score colors here',
      //   contexts: [pageAction],
      // },
    ];

    menuItems.forEach(item => browser.contextMenus.create(item));
  },

  handler: async (info, tab) => {
    // let alternateScoreColors;
    const menuId = info.menuItemId;
    switch (menuId) {
      case 'showScoreOnLinks':
        await storage.config.content.set('showScoreOnLinks', info.checked);
        break;
      // case 'alternateScoreColors':
      //   alternateScoreColors = (await storage.config.content.get('alternateScoreColors')) || [];
      //   alternateScoreColors.push(tab.url);
      //   await storage.config.content.set('alternateScoreColors', alternateScoreColors);
      //   break;
      default:
    }
  },
};

export default contextMenu;
