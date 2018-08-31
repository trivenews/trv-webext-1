import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const logo = browser.runtime.getURL('static/icons/trive-32.png');
class Header extends React.Component<{}, any> {
  constructor(props) {
    super(props);

    this.toggleUserMenu = this.toggleUserMenu.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggleUserMenu() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  render() {
    const notifAvatarStyle = {
      backgroundImage: 'url(../static/icons/trive-32.png)',
    };
    return (
      <div className='header py-4 px-2'>
        <div className='d-flex'>
          <a className='header-brand' href='../index.html'>
            <img src={logo} className='header-brand-img' alt='Trive logo' />
            Trive
          </a>
          <div className='d-flex ml-auto'>
            {/* Notifications */}

            {/*<div className='dropdown d-flex'>
              <a className='nav-link icon' data-toggle='dropdown'>
                <i className='fe fe-bell' />
                <span className='nav-unread' />
              </a>
              <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                <a href='#' className='dropdown-item d-flex'>
                  <span className='avatar mr-3 align-self-center' style={notifAvatarStyle} />
                  <div>
                    <strong>Nathan</strong> pushed new commit: Fix page load performance issue.
                    <div className='small text-muted'>10 minutes ago</div>
                  </div>
                </a>
                <a href='#' className='dropdown-item d-flex'>
                  <span className='avatar mr-3 align-self-center' style={notifAvatarStyle} />
                  <div>
                    <strong>Alice</strong> started new task: Tabler UI design.
                    <div className='small text-muted'>1 hour ago</div>
                  </div>
                </a>
                <a href='#' className='dropdown-item d-flex'>
                  <span className='avatar mr-3 align-self-center' style={notifAvatarStyle} />
                  <div>
                    <strong>Rose</strong> deployed new version of NodeJS REST Api V3
                    <div className='small text-muted'>2 hours ago</div>
                  </div>
                </a>
                <div className='dropdown-divider' />
                <a href='#' className='dropdown-item text-center text-muted-dark'>
                  Mark all as read
                </a>
              </div>
            </div> */}
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleUserMenu}>
              <DropdownToggle tag='span'>
                <a href='#' className='nav-link pr-0 leading-none'>
                  <span className='avatar' style={notifAvatarStyle} />
                  <span className='ml-2 d-block'>
                    <span className='text-default'>Guest</span>
                    <small className='text-muted d-block mt-1'>Researcher</small>
                  </span>
                </a>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Menu</DropdownItem>
                <DropdownItem>
                  <i className='dropdown-icon fe fe-user' /> Profile
                </DropdownItem>
                <DropdownItem>
                  <i className='dropdown-icon fe fe-settings' /> Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className='dropdown-icon fe fe-help-circle' /> Need help?
                </DropdownItem>
                <DropdownItem>
                  <i className='dropdown-icon fe fe-log-out' /> Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
