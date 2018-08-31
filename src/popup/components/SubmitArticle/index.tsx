import * as React from 'react';
import { Button, CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';

class SubmitArticle extends React.Component<{}, any> {
  captureVisible = () => {
    browser.runtime.sendMessage({
      action: 'capture',
    });
  }

  render() {
    return (
      <Form>
        <Label for='screenshotFile'>Select Sreenshot</Label>
        <div className='form-inline'>
          <FormGroup>
            <CustomInput type='file' id='screenshotFile' name='screenshotFile' label='Max size of 2MB' />
          </FormGroup>
          <FormGroup>
            <Button className='btn-pill ml-2' color='secondary' onClick={this.captureVisible}>
              📷
            </Button>
            <Button className='btn-pill ml-2' color='secondary'>
              🔲
            </Button>
          </FormGroup>
        </div>

        <FormGroup>
          <Label for='whatsWrong'>What's Wrong on the Internet? [Describe Content to be Trived]</Label>
          <Input type='textarea' minLength='30' rows='5' name='whatsWrong' id='whatsWrong' />
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
