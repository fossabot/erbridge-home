import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ScrollArea from 'react-scrollarea';

import Logo from './Logo';

import './Body.css';

class Body extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  };

  render() {
    const { className, children, pointerPosition } = this.props;

    return (
      <div className={classnames(className, 'Body')}>
        <Logo
          className="Body__logo"
          focused
          pointerPosition={pointerPosition}
        />
        <ScrollArea
          className="Body__scrollarea"
          contentClassName="Body__scrollarea__content"
          verticalContainerClassName="scrollbar-container vertical"
          smoothScrolling
        >
          <div className="Body__content">{children}</div>
        </ScrollArea>
      </div>
    );
  }
}

export default Body;
