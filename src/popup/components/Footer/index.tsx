import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import popupLinks from '../../../lib/popupLinks';

class Footer extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    window.addEventListener('load', popupLinks);
  }

  render() {
    return (
      <footer className='footer'>
        <Container>
          <Row className='align-items-center flex-row-reverse'>
            <Col className='col-auto ml-lg-auto'>
              <Row className='align-items-center'>
                <Col className='col-auto'>
                  <ul className='list-inline list-inline-dots mb-0'>
                    <li className='list-inline-item'>
                      <a href='#' popup-link='https://github.com/devkabiir/trv-webext/issues/new/choose'>
                        🐛 Found a bug?
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#' popup-link='https://trive.news/privacy-policy'>
                        Privacy Policy
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#' popup-link='https://trive.news/terms-of-use'>
                        Terms of service
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#' popup-link='https://trive.news/faq'>
                        FAQ
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col className='col-auto'>
                  <a href='#' popup-link='https://trive.news' className='btn btn-outline-primary btn-sm'>
                    Website
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
export default Footer;
