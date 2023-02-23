import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, currentImage }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div>
        <img
          className={css.modal}
          src={currentImage.src}
          alt={currentImage.alt}
        />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImage: PropTypes.object.isRequired,
};
