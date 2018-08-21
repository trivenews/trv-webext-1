export default async function handleIconClick({
  url = '',
}) {
  const scores = await browser.storage.local.get(['scores']);

  const allScores = scores.scores;
  const urlToCheck = url;

  if (Object.prototype.hasOwnProperty.call(allScores, `${urlToCheck}`) && Object.prototype.hasOwnProperty.call(allScores, 'link')) {
    await browser.tabs.create({
      url: allScores[urlToCheck].link,
      active: true,
    });
  }
}
