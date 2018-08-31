import cropperjs from 'cropperjs';

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

const saveFile = async (blob: Blob, filename: string) => {
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

/**
 *
 * @param imageDataUri
 * @param cropData
 * @returns a `DataURL` of the cropped image in `JPEG` format
 */
function cropImage(imageDataUri: string, cropData: cropperjs.Data): string {
  const imageEl = new Image();
  imageEl.src = imageDataUri;

  return new cropperjs(imageEl)
    .setData(cropData)
    .getCroppedCanvas()
    .toDataURL('image/jpeg', 1.0);
}

const screenshotFilename = () =>
  'Trive screenshot ' + new Date(Date.now()).toLocaleString().replace(/, |:|\//g, '-') + '.jpg';

/**
 * Captures the visible tab in curerntly active window
 * crops the captured if messageData is supplied
 * saves the file to disk with a save dialog
 * @param messageData
 */
const screenshot = async (messageData?) => {
  const cropData: cropperjs.Data = messageData;
  let screenshotDataUri = await captureVisibleTab();

  if (cropData) {
    screenshotDataUri = cropImage(screenshotDataUri, cropData);
  }

  const screenshotBlob = dataUrltoBlob(screenshotDataUri);

  await saveFile(screenshotBlob, screenshotFilename());
};

export default screenshot;
