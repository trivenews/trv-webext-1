import cropperjs from 'cropperjs';
import './style/index.scss';
import { processLinks, storage, scoreCardComponent } from '../lib/';

storage.config.content.get('showScoreOnLinks').then(shouldShowScore => {
  // here we're first converting the value to an actual boolean
  if (!!shouldShowScore) {
    window.addEventListener('load', () => {
      processLinks(uniqueLinks => {
        const links: [{ link?: string; fullLink?: string }] = [{}];

        for (let i = 0; i < uniqueLinks.length; i += 1) {
          links.push({
            link: uniqueLinks[i].getAttribute('href'),
            fullLink: uniqueLinks[i].href,
          });
        }

        browser.runtime.sendMessage({
          links,
        });
      });
    });
  }
});

let isCropperActivated = false;
let cropper: cropperjs;

const fakeImage = (imageSrc?: string): HTMLImageElement => {
  const container = document.createElement('div');
  container.id = 'fake-image-container';
  container.classList.add('fake-image-container');
  container.classList.add('fake-image');

  const image = new Image();
  image.classList.add('fake-image');
  image.classList.add('fake-image-pos');

  image.src = imageSrc || browser.runtime.getURL('static/icons/pixel.png');
  document.getElementsByTagName('body')[0].insertAdjacentElement('afterend', container);
  container.appendChild(image);

  image.onerror = e => {
    console.log(`fake-image couldn't be added :${e}`);
  };
  image.onload = () => {
    console.log('fake-image added');
  };
  return image;
};

const activateCropper = (image: HTMLImageElement) => {
  return new cropperjs(image, {
    autoCrop: false,
    viewMode: 3,
    movable: true,
    cropBoxMovable: true,
    zoomable: false,
    zoomOnTouch: false,
    zoomOnWheel: false,
    checkCrossOrigin: false,
    background: false,
    cropBoxResizable: true,
    guides: false,
    highlight: false,
    modal: false,
    // minCropBoxHeight: 300,
    // minCropBoxWidth: 300,
  });
};

browser.runtime.onMessage.addListener(message => {
  if (Object.prototype.hasOwnProperty.call(message, 'linksWithScores')) {
    console.log('got links back');
    message.linksWithScores.forEach(elm => {
      const aElm = document.querySelectorAll(`a[href="${elm.link}"]`);
      aElm.forEach(element => {
        if (element.firstChild) {
          const scoreCard = scoreCardComponent(elm.score);
          // Modify this to change the location for scoreCardComponent
          element.insertBefore(scoreCard, element.firstChild);
        }
      });
    });
    return true;
  }

  if (!isCropperActivated && message.data === 'activate-cropper') {
    isCropperActivated = true;
    const pixelImageEl = fakeImage();

    // this create a fake image and activates cropper on
    // since the image is not visible the user only sees
    // the crop box
    cropper = activateCropper(pixelImageEl);
  } else {
    const cropBoxData = cropper.getCropBoxData();

    // destroy old fake image and cropper
    cropper.reset();
    cropper.clear();
    cropper.destroy();
    (document.getElementById('fake-image-container') as HTMLDivElement).remove();
    isCropperActivated = false;

    // wait for 500ms so we don't get crop box in the screenshot
    setTimeout(() => {
      const com = browser.runtime.sendMessage({ action: 'capture-only' });

      com.then(
        screenshotDataUri => {
          const screenshotImageEl = fakeImage(screenshotDataUri);
          const screenshotCropper = new cropperjs(screenshotImageEl, { autoCrop: true });

          screenshotImageEl.addEventListener('ready', e => {
            screenshotCropper.setCropBoxData(cropBoxData);
            // emits the 'crop' event and sets the crop box
            screenshotCropper.crop();
          });

          screenshotImageEl.addEventListener('crop', e => {
            const currentState = screenshotCropper.getCropBoxData();
            const croppedImage = screenshotCropper
              .getCroppedCanvas({
                // maxWidth: 4096,
                // maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
              })
              .toDataURL('image/jpeg', 1.0);

            // The first crop event is emitted when the cropper is initialized and
            // before we set the crop box data.
            // In 'ready' event we are setting the crop box data and also emitting 'crop' event
            // This is to make sure we only save the image on second 'crop' event.
            if (
              currentState.height === cropBoxData.height &&
              currentState.width === cropBoxData.width &&
              currentState.top === cropBoxData.top &&
              currentState.left === cropBoxData.left
            ) {
              browser.runtime.sendMessage({ action: 'save-only', data: croppedImage }).then(_ => {
                console.log('saved screenshot');
              });

              // cleanup
              screenshotCropper.destroy();
              (document.getElementById('fake-image-container') as HTMLDivElement).remove();
            }
          });
        },

        error => {
          console.log(`error ${JSON.stringify(error)}`);
        },
      );
    }, 500);
  }
});
