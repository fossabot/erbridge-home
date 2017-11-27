import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Lightbox from 'react-images';

import './ViewableImage.css';

class ViewableImage extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
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
    const { alt, className, src } = this.props;
    const { lightboxIsOpen } = this.state;

    return (
      <span
        className={classnames('ViewableImage', className)}
        onClick={() => this.openLightbox()}
      >
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
