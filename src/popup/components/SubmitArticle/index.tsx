import * as React from 'react';
import { Button, CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';
import { storage } from '../../../lib';

const currentTab = async () =>
  (await browser.tabs.query({
    active: true,
  }))[0];

const activateCropper = async () => {
  try {
    const tab = await currentTab();

    // this makes sure we only activate cropper in the current active tab
    browser.tabs.sendMessage(tab.id || 0, { data: 'activate-cropper' }).then(res => console.log(res));
  } catch (error) {
    console.log('Error activating cropper');
    console.log(error);
  }
};

class SubmitArticle extends React.Component<{}, any> {
  constructor(props) {
    super(props);

    this.state = {
      selectedScreenshotFilename: 'No file selected',
      screenshotFile: '',
      title: '',
      url: '',
      desc: '',
    };

    currentTab().then(tab => {
      this.setState(() => ({
        title: tab.title,
        url: tab.url,
      }));

      storage.formCache.get(this.state.url).then(cache => {
        if (Object.keys(cache).length) {
          this.setState(() => cache);
        }
      });
    });
  }

  captureVisible = () => {
    browser.runtime.sendMessage({
      action: 'capture-and-save',
    });
  }

  captureRegion = () => {
    activateCropper();
  }

  updateScreenshotState = (target: HTMLInputElement) => {
    let name: string = 'No file selected';
    let fileDataUri: string = '';
    let fileBlob;

    if (target.files && target.files.length) {
      name = target.files[0].name;
      fileBlob = target.files[0];
    }

    if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onloadend = () => {
        fileDataUri = reader.result as string;

        this.setState({ screenshotFile: fileDataUri }, () => {
          storage.formCache.set(this.state.url, this.state);
        });
      };
    }

    // Always update the name i.e. label and title
    this.setState({ selectedScreenshotFilename: name }, () => {
      storage.formCache.set(this.state.url, this.state);
    });
  }

  cacheForm = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (!e.target) {
      return;
    }

    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'desc':
        const state = { desc: target.value };
        this.setState(state, () => {
          storage.formCache.set(this.state.url, this.state);
        });
        break;
      case 'screenshotFile':
        this.updateScreenshotState(target);
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Form onInput={this.cacheForm}>
        <Label for='screenshotFile'>Select Sreenshot</Label>
        <div className='form-inline'>
          <FormGroup>
            <CustomInput
              type='file'
              accept='.jpg,.jpeg'
              id='screenshotFile'
              name='screenshotFile'
              label={
                this.state.selectedScreenshotFilename.length < 20
                  ? this.state.selectedScreenshotFilename
                  : this.state.selectedScreenshotFilename.substr(0, 20) + '...'
              }
              title={this.state.selectedScreenshotFilename}
            />
          </FormGroup>
          <FormGroup>
            <Button
              className='btn-pill ml-2'
              color='secondary'
              onClick={this.captureVisible}
              title='Capture visible tab'>
              📷
            </Button>
            <Button className='btn-pill ml-2' color='secondary' onClick={this.captureRegion} title='Capture region'>
              🔲
            </Button>
          </FormGroup>
        </div>

        <FormGroup>
          <Label for='desc'>What's Wrong on the Internet? [Describe Content to be Trived]</Label>
          <Input type='textarea' minLength='30' rows='5' name='desc' id='desc' value={this.state.desc} />
        </FormGroup>

        {/*<div className='form-inline flex-row-reverse'>
          <FormGroup className='mr-2'>
            <Label for='researchers' className='mr-1'>
              Researchers
            </Label>
            <Input type='select' name='researchers' id='researchers'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup className='mr-2'>
            <Label for='verifiers' className='mr-1'>
              Verifiers
            </Label>
            <Input type='select' name='verifiers' id='verifiers'>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </Input>
          </FormGroup>
        </div> */}
        <div className='form-inline flex-row-reverse'>
          <Button className='mt-3' color='primary'>
            Trive this!
          </Button>
          {/*<FormGroup className='mr-2'>
            <Label for='userEmail' className='mr-1'>
              Your Email
            </Label>
            <Input type='email' name='userEmail' id='userEmail' placeholder='something@idk.cool' />
          </FormGroup> */}
        </div>
      </Form>
    );
  }
}
export default SubmitArticle;
