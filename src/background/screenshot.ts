/**
 *  Converts `DataURI` string to blob
 * @param dataUri
 * @param contentType defaults to image/jpeg
 * @param sliceSize defaults to 512 for performance
 * @returns a blob
 *
 * @see http://stackoverflow.com/questions/16245767/ddg#16245768
 * @see https://stackoverflow.com/a/12300351/6552940
 */
const dataUrltoBlob = (dataUri: string, contentType: string = 'image/jpeg', sliceSize: number = 512): Blob => {
  // get the actual base64 part without the `base64` string in it
  const byteCharacters = atob(dataUri.split(',')[1]);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    // tslint:disable-next-line:prefer-array-literal
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

/**
 *
 * @param windowId defaults to currently active window
 * @returns a `DataURL`
 */
const captureVisibleTab = async (windowId?: number): Promise<string> => {
  const imageDetails: browser.extensionTypes.ImageDetails = {
    format: 'jpeg',
    quality: 100,
  };

  return await browser.tabs.captureVisibleTab(windowId, imageDetails);
};

export const saveFile = async (screenshotDataUri: string, filename: string = screenshotFilename()) => {
  const blob = dataUrltoBlob(screenshotDataUri);

  try {
    await browser.downloads.download({
      filename,
      url: URL.createObjectURL(blob),
      saveAs: true,
    });
  } catch (error) {
    console.log(`Error while trying to save screenshot\n${JSON.stringify(error)}`);
    console.log(`File name:${filename}`);
  }
};

const screenshotFilename = () =>
  'Trive screenshot ' + new Date(Date.now()).toLocaleString().replace(/, |:|\//g, '-') + '.jpg';

/**
 * Captures and returns screenshot DataUri
 */
const screenshot = async () => {
  return await captureVisibleTab();
};

export default screenshot;
