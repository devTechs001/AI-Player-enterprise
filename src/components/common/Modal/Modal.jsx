import { useEffect, useRef } from 'react';
import { X } from 'react-icons/lu';
import './Modal.scss';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  variant = 'default',
  closable = true,
  showHeader = true,
  showFooter = false,
  footerContent,
  className = '',
  overlayClassName = '',
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement;
      
      // Focus modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen && closable) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closable]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && closable) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${overlayClassName}`} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={`modal modal-${size} modal-${variant} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        {...props}
      >
        {showHeader && (
          <div className="modal-header">
            {title && (
              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>
            )}
            {closable && (
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="modal-close-icon" />
              </button>
            )}
          </div>
        )}

        <div className="modal-body">
          {children}
        </div>

        {showFooter && (
          <div className="modal-footer">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
