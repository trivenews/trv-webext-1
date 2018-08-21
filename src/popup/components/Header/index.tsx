import * as React from 'react';
import { Button } from 'reactstrap';
// TODO: static link assets
const logo = require('../../../assets/trive-32.png');
class Header extends React.Component<{}, any> {
  render() {
    const notifAvatarStyle = {
      backgroundImage: 'url(../public/static/icons/trive-32.png)',
    };
    return (
      <div className='header py-4 px-2'>

        <div className='d-flex'>
          <a className='header-brand' href='../index.html'>
            <img src={logo} className='header-brand-img' alt='Trive logo' />Trive
          </a>
          <div className='d-flex ml-auto'>

            {/* Notifications */}
            <div className='dropdown d-flex'>
              <a className='nav-link icon' data-toggle='dropdown'>
                <i className='fe fe-bell'></i>
                <span className='nav-unread'></span>
              </a>
              <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                <a href='#' className='dropdown-item d-flex'>
                  <span className='avatar mr-3 align-self-center' style={notifAvatarStyle}></span>
                  <div>
                    <strong>Nathan</strong> pushed new commit: Fix page load performance issue.
                      <div className='small text-muted'>10 minutes ago</div>
                  </div>
                </a>
                <a href='#' className='dropdown-item d-flex'>
                  <span className='avatar mr-3 align-self-center' style={notifAvatarStyle}></span>
                  <div>
                    <strong>Alice</strong> started new task: Tabler UI design.
                      <div className='small text-muted'>1 hour ago</div>
                  </div>
                </a>
                <a href='#' className='dropdown-item d-flex'>
                  <span className='avatar mr-3 align-self-center' style={notifAvatarStyle}></span>
                  <div>
                    <strong>Rose</strong> deployed new version of NodeJS REST Api V3
                      <div className='small text-muted'>2 hours ago</div>
                  </div>
                </a>
                <div className='dropdown-divider'></div>
                <a href='#' className='dropdown-item text-center text-muted-dark'>Mark all as read</a>
              </div>
            </div>
            <div className='dropdown'>
              <a href='#' className='nav-link pr-0 leading-none' data-toggle='dropdown'>
                <span className='avatar' style={notifAvatarStyle}></span>
                <span className='ml-2 d-block'>
                  <span className='text-default'>Guest</span>
                  <small className='text-muted d-block mt-1'>Researcher</small>
                </span>
              </a>
              <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                <a className='dropdown-item' href='#'>
                  <i className='dropdown-icon fe fe-user'></i> Profile
                  </a>
                <a className='dropdown-item' href='#'>
                  <i className='dropdown-icon fe fe-settings'></i> Settings
                  </a>
                <a className='dropdown-item' href='#'>
                  <span className='float-right'><span className='badge badge-primary'>6</span></span>
                  <i className='dropdown-icon fe fe-mail'></i> Inbox
                  </a>
                <a className='dropdown-item' href='#'>
                  <i className='dropdown-icon fe fe-send'></i> Message
                  </a>
                <div className='dropdown-divider'></div>
                <a className='dropdown-item' href='#'>
                  <i className='dropdown-icon fe fe-help-circle'></i> Need help?
                  </a>
                <a className='dropdown-item' href='#'>
                  <i className='dropdown-icon fe fe-log-out'></i> Sign out
                  </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    );
  }
}
export default Header;
