import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.css';

const modal = document.querySelector('#modal-root');

export default function Modal({ info, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleKeyDown(evt) {
    if (evt.code === 'Escape') {
      onClose();
    }
  }

  function handleBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={info.url} alt={info.alt} />
      </div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  info: PropTypes.object,
  onClose: PropTypes.func,
};
