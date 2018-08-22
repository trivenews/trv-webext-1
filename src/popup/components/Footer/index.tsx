import * as React from 'react';

class Footer extends React.Component<{}, any> {
  render() {
    return (
      <footer className='footer'>
        <div className='container'>
          <div className='row align-items-center flex-row-reverse'>
            <div className='col-auto ml-lg-auto'>
              <div className='row align-items-center'>
                <div className='col-auto'>
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
                </div>
                <div className='col-auto'>
                  <a href='#' className='btn btn-outline-primary btn-sm'>
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
