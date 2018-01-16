import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Logo from './Logo';

import './LoadingPage.css';

class LoadingPage extends Component {
  static propTypes = {
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  };

  render() {
    const { pointerPosition } = this.props;

    return (
      <div className="LoadingPage">
        <Logo
          className="LoadingPage__logo"
          focused
          pointerPosition={pointerPosition}
        />
      </div>
    );
  }
}

export default LoadingPage;
