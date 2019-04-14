import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';


import logo from '../../assets/images/wattifi-logo-white.png';


const COLLAPSED_CLASS = 'Sidebar--collapsed';
const COLLAPSED_HOVER_CLASS = 'Sidebar--collapsed-hover';

const handleToggle = () => $('body').toggleClass(COLLAPSED_CLASS);

class Sidebar extends Component {

  renderMenuItem(item) {
    return (
      <li key={item.state}>
        <NavLink
          to={item.state}
          className="Sidebar__link"
          activeClassName="active"
          isActive={item.isActive}
        >
          <i className={`fas ${item.icon}`} />
          <span>{item.name}</span>
        </NavLink>
      </li>
    )
  }

  componentDidMount() {
    $('.Sidebar').hover(() => {
      if ($('body').hasClass(COLLAPSED_CLASS)) {
        $('body').toggleClass(COLLAPSED_HOVER_CLASS);
      }
    }, () => {
        $('body').removeClass(COLLAPSED_HOVER_CLASS);
    });
  }

  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar__header">
          <div className="Sidebar__logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="Sidebar__actions">
            <div
              className="Sidebar__toggler"
              onClick={handleToggle}
            >
              <span></span>
            </div>
          </div>
        </div>

        <div className="Sidebar__body">
          <ul className="Sidebar__links">
            {this.props.menuItems.map(this.renderMenuItem.bind(this))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar;
