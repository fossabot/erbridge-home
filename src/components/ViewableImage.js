import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
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
      <Fragment>
        <Img
          className={classnames(className, 'ViewableImage')}
          src={src}
          alt={alt}
          unloader={<span className="ViewableImage__placeholder">{alt}</span>}
          onClick={() => this.openLightbox()}
        />
        <Lightbox
          images={[{ src }]}
          isOpen={lightboxIsOpen}
          showImageCount={false}
          onClose={() => this.closeLightbox()}
        />
      </Fragment>
    );
  }
}

export default ViewableImage;
