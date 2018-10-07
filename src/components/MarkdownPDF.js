import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getAsset } from '../assets';

import './MarkdownPDF.scss';

class MarkdownPDF extends Component {
  static propTypes = {
    paperSize: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { paperSize, src, title } = this.props;

    return (
      <p className={classnames('MarkdownPDF', `MarkdownPDF--${paperSize}`)}>
        <iframe
          className="MarkdownPDF__content"
          title={title}
          src={getAsset(src)}
          frameBorder="0"
        />
      </p>
    );
  }
}

export default MarkdownPDF;
