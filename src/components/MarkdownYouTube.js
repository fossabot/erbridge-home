import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './MarkdownYouTube.scss';

class MarkdownYouTube extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
  };

  render() {
    const { title, videoId } = this.props;

    return (
      <p className="MarkdownYouTube">
        <iframe
          className="MarkdownYouTube__content"
          title={title}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        />
      </p>
    );
  }
}

export default MarkdownYouTube;
