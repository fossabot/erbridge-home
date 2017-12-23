import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Icon.css';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { className, children } = this.props;

    return <div className={classnames(className, 'Icon')}>{children}</div>;
  }
}

export default Icon;
