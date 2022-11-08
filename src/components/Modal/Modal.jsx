import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageModal, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleClose}>
        <ImageModal>
          <img src={this.props.largeImageURL} alt="" />
        </ImageModal>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
