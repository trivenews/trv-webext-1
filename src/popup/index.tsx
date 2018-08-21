import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';

import { Card, CardBody } from 'reactstrap';

// Shared components
// import CompA from '../components/CompA';
// Private components
import SubmitArticle from './components/SubmitArticle';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * Shared component
 */

const noMarginBottom = {
  marginBottom: 0,
  // padding: 0,
};
ReactDOM.render(

  <div className='page'>
    <div className='page-main'>

      <Header />

      <Card style={noMarginBottom}>
        <CardBody>
          <SubmitArticle />
          {/* <CompA /> */}
        </CardBody>
      </Card>

    </div>

    <Footer />

  </div>
  ,
  document.getElementById('root') as HTMLElement,
);
