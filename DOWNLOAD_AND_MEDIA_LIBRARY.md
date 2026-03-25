# Download & Media Library Features

## Overview

The Ultimate Player now includes a comprehensive download and local media management system that allows users to:

1. **Download videos** from various platforms (Instagram, YouTube, Vimeo, TikTok, etc.)
2. **Save directly to Downloads folder** using modern browser APIs
3. **Scan and import local media files** for playback
4. **Track download history** with persistent storage
5. **Browse and manage** local media library

---

## Features

### 1. Download System

#### Download from URL
- Navigate to `/download` or click the download button in the video player
- Paste any supported URL (Instagram, YouTube, Vimeo, TikTok, Twitter, Facebook)
- Select format (MP4, WebM, etc.) and quality (1080p, 720p, etc.)
- Files are saved to your Downloads folder by default

#### Platform Detection
The system automatically detects the source platform and optimizes download parameters:
- **Instagram**: Reels and posts (smaller file sizes ~15MB)
- **YouTube**: Videos up to 4K
- **Vimeo**: High-quality videos
- **TikTok**: Short-form videos
- **Twitter/X**: Video tweets
- **Facebook**: Shared videos

#### File System Access
- Uses **File System Access API** (Chrome/Edge) for direct Downloads folder access
- Falls back to traditional browser download for other browsers
- Stores file handles in IndexedDB for future access

---

### 2. Media Library

#### Access
- Navigate to `/library` or click "Library" in the header navigation
- View all your local media files in one place

#### Import Media

**Scan Directory:**
1. Click "Scan Folder" button
2. Select a directory containing media files
3. System automatically analyzes and imports all supported formats

**Import Files:**
1. Click "Import Files" button
2. Select multiple files from any location
3. Files are added to your library

#### Supported Formats
- **Video**: MP4, WebM, MKV, AVI, MOV, FLV, WMV, 3GP
- **Audio**: MP3, AAC, WAV, FLAC, OGG, M4A, WMA
- **Images**: JPG, JPEG, PNG, GIF, WEBP, BMP

#### Features
- **Automatic Metadata Extraction**: Duration, dimensions, thumbnails
- **Smart Search**: Search by filename or title
- **Filtering**: By type (video/audio/image)
- **Sorting**: By date, name, size, or duration
- **View Modes**: Grid or list view
- **Statistics**: Total files, size, and duration

---

### 3. Download History

#### Persistent Storage
- All downloads are tracked in IndexedDB
- History persists across browser sessions
- View recent downloads in the Media Library page

#### History Includes
- Source URL and platform
- File name and format
- Quality and file size
- Download timestamp

---

### 4. Account Sync (Future)

The system is designed to support cloud sync when connected to a user account:
- Sync download history across devices
- Cloud storage for media library
- Shared playlists and favorites

---

## Technical Implementation

### Services

#### `download.service.js`
- Core download functionality
- Platform detection
- File System Access API integration
- IndexedDB storage for history and file handles
- FFmpeg integration for format conversion

#### `mediaScanner.service.js`
- Local file scanning
- Metadata extraction
- Thumbnail generation
- File type detection

### Contexts

#### `DownloadContext`
- Manages download state
- Handles concurrent downloads
- Progress tracking
- Download queue management

#### `MediaLibraryContext`
- Manages local media files
- Provides search and filter functionality
- Tracks statistics
- Handles file operations

### Hooks

#### `useDownload`
```javascript
const { download, analyzeURL, downloads, downloadHistory } = useDownload();
```

#### `useMediaLibrary`
```javascript
const {
  files,
  scanDirectory,
  importFiles,
  statistics,
  playFile,
} = useMediaLibrary();
```

---

## Usage Examples

### Download a Video

```javascript
// In any component
const { download } = useDownload();

const handleDownload = async () => {
  const result = await download('https://instagram.com/p/...', {
    format: 'mp4',
    quality: '1080p',
  });
  
  if (result.success) {
    console.log('Download started!');
  }
};
```

### Scan Local Directory

```javascript
const { scanDirectory, files } = useMediaLibrary();

const handleScan = async () => {
  await scanDirectory();
  // files will be updated automatically
};
```

### Play Local File

```javascript
const { getFileById, playFile } = useMediaLibrary();
const navigate = useNavigate();

const handlePlay = (fileId) => {
  const file = getFileById(fileId);
  const { media } = playFile(file);
  navigate('/player', { state: { media } });
};
```

---

## Browser Compatibility

### File System Access API
- ✅ Chrome 86+
- ✅ Edge 86+
- ❌ Firefox (not supported)
- ❌ Safari (not supported)

For browsers without File System Access API support, the system falls back to traditional downloads.

### IndexedDB
- ✅ All modern browsers support IndexedDB

---

## Privacy & Security

- **Local Storage**: All download history and file handles are stored locally in IndexedDB
- **No Server Upload**: Files are downloaded directly to user's machine
- **User Control**: Users choose which directories to scan
- **Permissions**: File System Access API requires explicit user permission for each directory access

---

## Future Enhancements

1. **Cloud Sync**: Connect to user account for cross-device synchronization
2. **Background Downloads**: Service worker integration for background download tasks
3. **Batch Downloads**: Download multiple videos at once
4. **Scheduled Downloads**: Queue downloads for specific times
5. **Advanced Metadata**: Use external APIs for rich metadata (posters, descriptions, etc.)
6. **Duplicate Detection**: Identify and manage duplicate files
7. **Smart Playlists**: Auto-generate playlists based on media analysis

---

## Troubleshooting

### Download Not Starting
- Check browser permissions for Downloads folder
- Ensure popup blocker isn't preventing download
- Try a different quality or format

### Can't Scan Directory
- Browser must support File System Access API
- Grant directory permissions when prompted
- Try importing files individually instead

### Missing Thumbnails
- Some video formats don't support thumbnail extraction
- Large files may timeout during metadata extraction
- Thumbnails are generated on-demand

### Download History Not Persisting
- Check if IndexedDB is enabled in browser
- Clear browser cache and try again
- Ensure sufficient storage space

---

## API Reference

### DownloadService Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `analyzeURL(url)` | Analyze video URL | `url: string` |
| `download(url, options, callbacks)` | Start download | `url: string`, `options: object`, `callbacks: object` |
| `getDownloadHistory()` | Get download history | - |
| `addToDownloadHistory(download)` | Add to history | `download: object` |
| `getStoredFileHandles()` | Get stored file handles | - |

### LocalMediaScanner Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `scanDirectory()` | Scan directory for media | - |
| `importFile()` | Import single file | - |
| `importFiles()` | Import multiple files | - |
| `analyzeFile(file, handle)` | Analyze file metadata | `file: File`, `handle: FileSystemFileHandle` |
| `getStatistics(files)` | Get library statistics | `files: array` |

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure browser is up to date
4. Contact support with error details
