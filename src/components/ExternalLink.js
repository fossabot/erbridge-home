import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ExternalLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    replaceCurrentTab: PropTypes.bool,
  };

  render() {
    const { children, className, replaceCurrentTab, to } = this.props;

    return (
      <a
        className={className}
        href={to}
        target={!replaceCurrentTab && '_blank'}
        rel={!replaceCurrentTab && 'noopener noreferrer'}
      >
        {children}
      </a>
    );
  }
}

export default ExternalLink;
