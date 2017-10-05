import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './Logo';

import './Header.css';

class Header extends Component {
  static propTypes = {
    homeRoute: PropTypes.shape({
      exact: PropTypes.bool,
      path: PropTypes.string.isRequired,
      strict: PropTypes.bool,
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
        strict: PropTypes.bool,
      }),
    ),
  };

  state = {
    shouldFocusLogo: false,
  };

  render() {
    const { homeRoute, pointerPosition, routes } = this.props;
    const { shouldFocusLogo } = this.state;

    return (
      <div
        className="Header"
        onMouseEnter={() => this.setState({ shouldFocusLogo: true })}
        onMouseLeave={() => this.setState({ shouldFocusLogo: false })}
      >
        <div className="Header__content">
          <NavLink
            exact={homeRoute.exact}
            strict={homeRoute.strict}
            to={homeRoute.path}
          >
            <Logo
              className="Header__logo"
              focused={shouldFocusLogo}
              pointerPosition={pointerPosition}
            />
          </NavLink>
          <div className="Header__nav">
            {routes &&
              routes
                .map((route, index) => (
                  <NavLink
                    key={route.name || index}
                    className="Header__nav-link"
                    activeClassName="Header__nav-link--active"
                    exact={route.exact}
                    strict={route.strict}
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
        </div>
      </div>
    );
  }
}

export default Header;
