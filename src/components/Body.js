import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Logo from './Logo';
import ScrollArea from './ScrollArea';

import './Body.scss';

class Body extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  state = {
    isScrolling: false,
  };

  render() {
    const { className, children } = this.props;
    const { isScrolling } = this.state;

    return (
      <div className={classnames(className, 'Body')}>
        <Logo className="Body__logo" focused />
        <ScrollArea
          className="Body__scrollarea"
          renderView={({ ...props }) => (
            <div className="Body__scrollarea__view" {...props} />
          )}
          renderTrackHorizontal={({ ...props }) => (
            <div
              className={classnames(
                'Body__scrollarea__track',
                'Body__scrollarea__track--horizontal',
                { 'Body__scrollarea__track--active': isScrolling },
              )}
              {...props}
            />
          )}
          renderTrackVertical={({ ...props }) => (
            <div
              className={classnames(
                'Body__scrollarea__track',
                'Body__scrollarea__track--vertical',
                { 'Body__scrollarea__track--active': isScrolling },
              )}
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
          onScrollStart={() => this.setState({ isScrolling: true })}
          onScrollStop={() => this.setState({ isScrolling: false })}
        >
          <div className="Body__content">{children}</div>
        </ScrollArea>
      </div>
    );
  }
}

export default Body;
