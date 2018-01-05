import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Img from 'react-image';
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
        className={classnames(className, 'ViewableImage')}
        onClick={() => this.openLightbox()}
      >
        <Img
          className="ViewableImage__image"
          src={src}
          alt={alt}
          unloader={<div className="ViewableImage__placeholder">{alt}</div>}
        />
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
