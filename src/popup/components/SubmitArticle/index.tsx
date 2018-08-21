import * as React from 'react';
import { Button, CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';

class SubmitArticle extends React.Component<{}, any> {
  render() {

    return (

      <Form>
        <FormGroup>
          <Label for='exampleCustomFileBrowser'>Select Sreenshot</Label>
          <CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' label='Max size of 2MB' />
        </FormGroup>
        <FormGroup>
          <Label for='exampleText'>What's Wrong on the Internet? [Describe Content to be Trived]</Label>
          <Input type='textarea' minLength='30'
            rows='5' name='text' id='exampleText' />
        </FormGroup>
        <div className='form-inline'>
          <FormGroup className='mr-2'>
            <Label for='exampleSelect'>Researchers</Label>
            <Input type='select' name='select' id='exampleSelect'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup className='mr-2'>
            <Label for='exampleSelect'>Verifiers</Label>
            <Input type='select' name='select' id='exampleSelect'>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </Input>
          </FormGroup>
          <FormGroup className='mr-2'>
            <Label for='exampleEmail' className=''>Your Email</Label>
            <Input type='email' name='email' id='exampleEmail' placeholder='something@idk.cool' />
          </FormGroup>
          <Button className='mt-3' color='primary'>Trive this!</Button>
        </div>

      </Form>
    );
  }
}
export default SubmitArticle;
