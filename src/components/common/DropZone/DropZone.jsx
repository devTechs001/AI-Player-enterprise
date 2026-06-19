import { useState, useRef, useCallback } from 'react';
import { FiUploadCloud, FiFile } from 'react-icons/fi';
import './DropZone.scss';

const DropZone = ({ onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer);
    }
  }, [onDrop]);

  return (
    <div
      className={`drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging ? (
        <div className="drop-zone-content">
          <FiUploadCloud className="drop-icon active" />
          <p className="drop-text">Drop files here</p>
        </div>
      ) : (
        <div className="drop-zone-content">
          <FiFile className="drop-icon" />
          <p className="drop-text">
            Drop media files anywhere to add them to your library
          </p>
        </div>
      )}
    </div>
  );
};

export default DropZone;
