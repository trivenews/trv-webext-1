import cropperjs from 'cropperjs';

/**
 *  Converts base64 string to blob
 * @param b64Data base 64 string
 * @param contentType defaults to image/jpeg
 * @param sliceSize defaults to 512 for performance
 * @returns a blob
 *
 * @see http://stackoverflow.com/questions/16245767/ddg#16245768
 */
const b64toBlob = (b64Data: string, contentType: string = 'image/jpeg', sliceSize: number = 512): Blob => {

  const byteCharacters = atob(b64Data);
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

const captureVisibleTab = async (windowId?: number): Promise<Blob> => {
  const imageDetails: browser.extensionTypes.ImageDetails = {
    format: 'jpeg',
    quality: 100,
  };
  const image = await browser.tabs.captureVisibleTab(windowId, imageDetails);
  return b64toBlob(image);
};

const saveFile = async (blob: Blob) => {
  try {
    await browser.downloads.download({
      url: URL.createObjectURL(blob), // The object URL can be used as download URL
      filename: 'Trive screenshot - ' + Date.now().toLocaleString(),
      saveAs: true,
    });
  } catch (error) {
    console.log(`Error while trying to save screenshot\n${error}`);
  }
};

function cropImage(image) {
  const imageEl = new image(image);
  new cropperjs(imageEl, {

  });

}
const screenshot = (message) => {

};

export default screenshot;
