import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './Logo';

import './Header.css';

class Header extends Component {
  static propTypes = {
    homeRoute: PropTypes.shape({
      exact: PropTypes.bool,
      path: PropTypes.string.isRequired,
    }).isRequired,
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        exact: PropTypes.bool,
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),
    ),
  };

  state = {
    navMenuIsOpen: false,
    shouldFocusLogo: false,
  };

  render() {
    const { homeRoute, pointerPosition, routes } = this.props;
    const { navMenuIsOpen, shouldFocusLogo } = this.state;

    return (
      <Fragment>
        <div
          className="Header"
          onFocus={() => this.setState({ shouldFocusLogo: true })}
          onBlur={() => this.setState({ shouldFocusLogo: false })}
          onMouseEnter={() => this.setState({ shouldFocusLogo: true })}
          onMouseLeave={() => this.setState({ shouldFocusLogo: false })}
        >
          <div className="Header__content">
            <NavLink exact={homeRoute.exact} to={homeRoute.path}>
              <Logo
                className="Header__logo"
                focused={shouldFocusLogo}
                pointerPosition={pointerPosition}
              />
            </NavLink>
            <div className="Header__spacer" />
            <div className="Header__nav">
              {routes &&
                routes
                  .map((route, index) => (
                    <NavLink
                      key={route.name || index}
                      className="Header__nav-link"
                      activeClassName="Header__nav-link--active"
                      exact={route.navExact}
                      to={route.path}
                    >
                      {route.link}
                    </NavLink>
                  ))
                  .reduce((elementsSoFar, link, index, links) => {
                    const elements = [...elementsSoFar, link];

                    if (index < links.length - 1) {
                      elements.push(
                        <div key={index} className="Header__nav-spacer" />,
                      );
                    }

                    return elements;
                  }, [])}
            </div>
            <div
              className={classnames('Header__nav-menu-trigger', {
                'Header__nav-menu-trigger--active': navMenuIsOpen,
              })}
              onClick={() => this.setState({ navMenuIsOpen: !navMenuIsOpen })}
            >
              Menu
              <div className="Header__nav-menu-icon" />
            </div>
          </div>
        </div>
        <div
          className={classnames('Header__nav-menu', {
            'Header__nav-menu--active': navMenuIsOpen,
          })}
        >
          <div className="Header__nav-menu__content">
            {routes &&
              routes.map((route, index) => (
                <NavLink
                  key={route.name || index}
                  className="Header__nav-menu-link"
                  activeClassName="Header__nav-menu-link--active"
                  exact={route.navExact}
                  to={route.path}
                  onClick={() => this.setState({ navMenuIsOpen: false })}
                  tabIndex={navMenuIsOpen ? 0 : -1}
                >
                  {route.link}
                </NavLink>
              ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
