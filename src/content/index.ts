import cropperjs from 'cropperjs';
import './style/index.scss';
// const a = new Cropper(null,null);

const fakeImage = (): HTMLImageElement => {
  const container = document.createElement('div');
  container.id = 'fake-image-container';
  // container.classList.add('fake-image-container');
  container.classList.add('fake-image');

  const image = new Image();
  // image.classList.add('fake-image');
  // image.classList.add('fake-image-pos');

  image.src = browser.runtime.getURL('static/icons/pixel.png');
  document.getElementsByTagName('body')[0].appendChild(container);
  container.appendChild(image);

  image.onerror = (e) => {
    console.log(e);
  };
  image.onload = () => {

    console.log('fake-image added');
  };
  return image;
};

const cropper = new cropperjs(
  fakeImage(),
  {
    movable: true, cropBoxMovable: true, zoomable: false, zoomOnTouch: false, zoomOnWheel: false,
    ready(event) {
      console.log(event);
    },
    background: false,
    cropBoxResizable: true,
    guides: true,
    highlight: false, modal: false, minCropBoxHeight: 300, minCropBoxWidth: 300,
  });

// Delete the whole folder if you don't want this script be generated
console.log('content script loaded');
console.log(browser.runtime.getURL('/static/icons/Jcrop.gif'));
