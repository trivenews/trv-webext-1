import { themeColors } from './common';

export default function scoreCardComponent(score) {
  const scoreInt = Number.parseInt(score, 10);
  const title = Number.isNaN(scoreInt) ? (score === '!' ? 'Trive this!' : 'Under Research') : 'Trive Score';
  let background = themeColors.neutral;
  const textColor = 'black';

  if (scoreInt < -50 && scoreInt > -101) {
    background = themeColors.error;
  }
  if (scoreInt <= 0 && scoreInt >= -50) {
    background = themeColors.warning;
  }
  if (scoreInt > 0 && scoreInt <= 50) {
    background = themeColors.positive;
  }
  if (scoreInt > 50) {
    background = themeColors.success;
  }

  return `<div  title="${title}"
  style="
  background-color:${background};
  color:${textColor};
  width: 1.6vw;
  text-align:center;
  display:inline-block;">
  <span>${score}</span>
  </div> `;
}
