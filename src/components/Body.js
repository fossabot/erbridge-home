import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Logo from './Logo';
import ScrollArea from './ScrollArea';

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
          renderView={({ ...props }) => (
            <div className="Body__scrollarea__view" {...props} />
          )}
          renderTrackHorizontal={({ ...props }) => (
            <div
              className="Body__scrollarea__track Body__scrollarea__track--horizontal"
              {...props}
            />
          )}
          renderTrackVertical={({ ...props }) => (
            <div
              className="Body__scrollarea__track Body__scrollarea__track--vertical"
              {...props}
            />
          )}
          renderThumbHorizontal={({ ...props }) => (
            <div className="Body__scrollarea__thumb" {...props} />
          )}
          renderThumbVertical={({ ...props }) => (
            <div className="Body__scrollarea__thumb" {...props} />
          )}
          hideTracksWhenNotNeeded
        >
          <div className="Body__content">{children}</div>
        </ScrollArea>
      </div>
    );
  }
}

export default Body;
