import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

class Lightbox extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  render() {
    const { src, isOpen, onClose } = this.props;

    return (
      <ModalGateway>
        {isOpen && (
          <Modal onClose={onClose} allowFullscreen={false}>
            <Carousel
              views={[{ src }]}
              components={{ FooterCount: () => <div /> }}
            />
          </Modal>
        )}
      </ModalGateway>
    );
  }
}

export default Lightbox;
