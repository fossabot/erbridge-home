import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import './MarkdownYouTube.scss';

class MarkdownYouTube extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
  };

  render() {
    const { videoId } = this.props;

    return (
      <div className="MarkdownYouTube">
        <ReactPlayer
          className="MarkdownYouTube__content"
          url={`https://www.youtube.com/embed/${videoId}`}
          config={{
            youtube: {
              embedOptions: {
                host: 'https://www.youtube-nocookie.com',
              },
            },
          }}
          controls
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

export default MarkdownYouTube;
