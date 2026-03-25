import { useContext } from 'react';
import MediaLibraryContext from '@context/MediaLibraryContext';

export const useMediaLibrary = () => {
  const context = useContext(MediaLibraryContext);

  if (!context) {
    throw new Error('useMediaLibrary must be used within a MediaLibraryProvider');
  }

  return context;
};

export default useMediaLibrary;
