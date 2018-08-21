import updateIcon from './updateIcon';
import getTrives from './getTrives';
import {
  getScoreColor,
  getScoreTitle,
} from './common';

/**
 *
 * @param {{tabId:Number,windowId:Number}} activeInfo
 */
export async function onActivated(activeInfo) {
  const tab = await browser.tabs.get(activeInfo.tabId);
  const trive = await getTrives([{
    link: '',
    fullLink: tab.url,
  }]);

  const triveScore = trive[0].score;
  await updateIcon({
    tabId: activeInfo.tabId,
    title: getScoreTitle(triveScore),
    badgeText: triveScore,
    badgeColor: getScoreColor(triveScore),
  });
}

/**
 *
 * @param {Number} tabId
 * @param {{status:String,discarded?:boolean,url?:String,pinned?:boolean}}changeInfo __has more properties__
 * @param {browser.tabs.Tab} tab
 */
export async function onUpdated(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'complete') {
    await updateIcon({
      tabId,
      title: 'Loading...',
      disable: true,
    });
  } else {
    const trive = await getTrives([{
      fullLink: tab.url,
      link: '',
    }]);
    const triveScore = trive[0].score;
    await updateIcon({
      tabId,
      title: getScoreTitle(triveScore),
      badgeColor: getScoreColor(triveScore),
    });
  }
}
