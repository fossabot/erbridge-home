import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Body.css';

class Body extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={classnames(className, 'Body')}>
        <div className="Body__content">
          {children}
        </div>
      </div>
    );
  }
}

export default Body;
