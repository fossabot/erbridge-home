import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './Logo';

import './Header.css';

class Header extends Component {
  static propTypes = {
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
        strict: PropTypes.bool,
      }),
    ),
  };

  state = {
    shouldFocusLogo: false,
  };

  render() {
    const { pointerPosition, routes } = this.props;
    const { shouldFocusLogo } = this.state;

    return (
      <div
        className="Header"
        onMouseEnter={() => this.setState({ shouldFocusLogo: true })}
        onMouseLeave={() => this.setState({ shouldFocusLogo: false })}
      >
        <div className="Header__content">
          <Logo
            className="Header__logo"
            focused={shouldFocusLogo}
            pointerPosition={pointerPosition}
          />
          <div className="Header__nav">
            {routes &&
              routes.map((route, index) => (
                <NavLink
                  key={index}
                  activeClassName="Header__nav-link--active"
                  className={classnames(
                    'Header__nav-link',
                    `Header__nav-link--${route.name}`,
                  )}
                  exact={route.exact}
                  strict={route.strict}
                  to={route.path}
                >
                  {route.link}
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
