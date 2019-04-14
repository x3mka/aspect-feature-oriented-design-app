import React, {Component} from 'react';
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

class UserSessionInfo extends Component {
  render() {
    const Link = this.props.link;

    return (
      <div className="HeaderTopBar__item">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="div"
            className="HeaderTopBar__user"
          >
            <div className="HeaderTopBar__user-inner">
              <span className="HeaderTopBar__user-welcome">Hi,</span>
              <span className="HeaderTopBar__user-name">{this.props.name}</span>
              {this.props.picture && <img
                src={this.props.picture}
                alt="gravatar"
                className="HeaderTopBar__user-gravatar"
              />}
            </div>
          </DropdownToggle>
          <DropdownMenu
            right
            className="dropdown-menu--unround dropdown-menu--anim"
          >
            <DropdownItem>
              <Link to={this.props.logout || '/logout'}>
                <i className="fas fa-sign-out-alt"/>
                {' '}
                Logout
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
}

export default UserSessionInfo;
