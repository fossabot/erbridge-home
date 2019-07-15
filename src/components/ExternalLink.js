import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ExternalLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { children, className, to } = this.props;

    return (
      <a
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
}

export default ExternalLink;
