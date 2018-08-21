let TRIVE_API_HOST;
let TRIVE_API_DEBUG;

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  TRIVE_API_HOST = 'http://local.wordpress.test/';
  TRIVE_API_DEBUG = '?XDEBUG_SESSION_START=PHPSTORM';
} else {
  TRIVE_API_HOST = 'https://verify.trive.news/';
  TRIVE_API_DEBUG = '';
}

/**
 * @param endpoint the endpoint to connect to
 * @returns {String} full url for the api
 */
export const apiEndPoint = (endpoint = ''): string => TRIVE_API_HOST + endpoint + TRIVE_API_DEBUG;

export const defaultIcon = {
  16: 'icons/trive-16.png',
  32: 'icons/trive-32.png',
  24: 'icons/trive-24.png',
  48: 'icons/trive-48.png',
  64: 'icons/trive-64.png',
  128: 'icons/trive-128.png',
};

export const grayIcon = {
  16: 'icons/trive-gray-16.png',
  32: 'icons/trive-gray-32.png',
  24: 'icons/trive-gray-24.png',
  48: 'icons/trive-gray-48.png',
  64: 'icons/trive-gray-64.png',
  128: 'icons/trive-gray-128.png',
};

export const themeColors = {
  default: '#4E4E53',
  neutral: '#FFEBEE',
  error: '#D92D2D',
  warning: '#FF6A00',
  info: '#304FFE',
  positive: '#C5EF15',
  success: '#15EF31',
};
/**
 *
 * @param {String} score
 */
export function getScoreTitle(score: string) {
  if (score === '!') return 'Trive this!';

  if (score === '??') return 'Under research';

  const result = Number.parseInt(score, 10);

  if (result >= 0) return `+${result}`;

  return `${result}`;
}

/**
 *
 * @param {String} score
 * @returns {String} hexadecimal value of the color.
 */
export function getScoreColor(score: string): string {
  const scoreInt = Number.parseInt(score, 10);
  let color;

  switch (true) {
    case (scoreInt < -50 && scoreInt > -101):
      color = themeColors.error;
      break;
    case (scoreInt <= 0 && scoreInt >= -50):
      color = themeColors.warning;
      break;
    case (scoreInt > 0 && scoreInt <= 50):
      color = themeColors.positive;
      break;
    case (scoreInt > 50):
      color = themeColors.success;
      break;
    default:
      color = themeColors.default;
  }

  return color;
}
