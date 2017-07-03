import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Logo from './Logo';

import './Header.css';

class Header extends Component {
  static propTypes = {
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  };

  state = {
    shouldFocusLogo: false,
  };

  render() {
    const { pointerPosition } = this.props;
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
        </div>
      </div>
    );
  }
}

export default Header;
