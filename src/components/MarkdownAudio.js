import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import { getAsset } from '../assets';

import './MarkdownAudio.scss';

class MarkdownAudio extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    const { src } = this.props;

    return (
      <div className="MarkdownAudio">
        <ReactPlayer
          className="MarkdownAudio__content"
          url={getAsset(src)}
          controls
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

export default MarkdownAudio;
