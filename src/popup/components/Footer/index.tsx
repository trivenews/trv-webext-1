import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
class Footer extends React.Component<{}, any> {
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
                      <a href='#'>🐛 Found a bug?</a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#'>Privacy Policy</a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#'>Terms of service</a>
                    </li>
                    <li className='list-inline-item'>
                      <a href='#'>FAQ</a>
                    </li>
                  </ul>
                </Col>
                <Col className='col-auto'>
                  <a href='#' className='btn btn-outline-primary btn-sm'>
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
