import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Lightbox from 'react-images';

import './ViewableImage.css';

class ViewableImage extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  state = {
    lightboxIsOpen: false,
  };

  openLightbox() {
    this.setState({ lightboxIsOpen: true });
  }

  closeLightbox() {
    this.setState({ lightboxIsOpen: false });
  }

  render() {
    const { src, alt } = this.props;
    const { lightboxIsOpen } = this.state;

    return (
      <span className="ViewableImage" onClick={() => this.openLightbox()}>
        <img src={src} alt={alt} />
        <Lightbox
          images={[{ src }]}
          isOpen={lightboxIsOpen}
          showImageCount={false}
          onClose={() => this.closeLightbox()}
        />
      </span>
    );
  }
}

export default ViewableImage;
