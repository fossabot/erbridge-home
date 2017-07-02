import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Logo from './Logo';

import './Header.css';

class Header extends Component {
  static propTypes = {
    pointerPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  };

  render() {
    const { pointerPosition } = this.props;

    return (
      <div className="Header">
        <div className="Header__content">
          <Logo className="Header__logo" pointerPosition={pointerPosition} />
        </div>
      </div>
    );
  }
}

export default Header;
