import express from 'express';
import cors from 'cors';
import https from 'https';
import ytdl from '@distube/ytdl-core';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const QUALITY_LABELS = {
  '2160p60': '2160p60',
  '2160p': '2160p',
  '1440p60': '1440p60',
  '1440p': '1440p',
  '1080p60': '1080p60',
  '1080p': '1080p',
  '720p60': '720p60',
  '720p': '720p',
  '480p': '480p',
  '360p': '360p',
  '240p': '240p',
  '144p': '144p',
};

const AUDIO_BITRATE_LABEL = (abr) => `${abr}kbps`;

function getItagLabel(format) {
  if (format.hasVideo && format.qualityLabel) {
    return format.qualityLabel;
  }
  if (format.hasAudio && !format.hasVideo) {
    return AUDIO_BITRATE_LABEL(format.audioBitrate);
  }
  return `itag ${format.itag}`;
}

app.post('/api/info', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const info = await ytdl.getInfo(url);

    const formats = info.formats
      .filter(f => f.url || f.contentLength)
      .map(f => ({
        itag: f.itag,
        qualityLabel: getItagLabel(f),
        container: f.container,
        hasVideo: f.hasVideo,
        hasAudio: f.hasAudio,
        contentLength: f.contentLength ? parseInt(f.contentLength) : null,
        fps: f.fps || null,
        width: f.width || null,
        height: f.height || null,
        mimeType: f.mimeType,
        bitrate: f.bitrate || null,
        audioBitrate: f.audioBitrate || null,
        codecs: f.codecs || null,
        approxDurationMs: info.videoDetails.lengthSeconds * 1000,
      }));

    res.json({
      title: info.videoDetails.title,
      author: info.videoDetails.author?.name || info.videoDetails.ownerChannelName || '',
      thumbnail: info.videoDetails.thumbnails?.sort((a, b) => b.width - a.width)[0]?.url || '',
      duration: parseInt(info.videoDetails.lengthSeconds),
      videoId: info.videoDetails.videoId,
      description: info.videoDetails.description?.slice(0, 500) || '',
      viewCount: info.videoDetails.viewCount,
      uploadDate: info.videoDetails.uploadDate,
      formats,
    });
  } catch (error) {
    console.error('Info error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/download', async (req, res) => {
  try {
    const { url, filename, mime, size } = req.query;
    if (!url) return res.status(400).json({ error: 'URL parameter required' });

    const decodedUrl = decodeURIComponent(url);
    const safeName = filename ? decodeURIComponent(filename).replace(/[<>:"/\\|?*\x00-\x1f]/g, '').trim().slice(0, 120) : 'video.mp4';
    const contentLength = size ? parseInt(size) : null;

    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(safeName)}"`);
    if (mime) res.setHeader('Content-Type', decodeURIComponent(mime));
    if (contentLength) res.setHeader('Content-Length', contentLength);

    const parsed = new URL(decodedUrl);
    https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.youtube.com/',
        'Origin': 'https://www.youtube.com',
      },
    }, (cdnRes) => {
      if (cdnRes.statusCode !== 200 && cdnRes.statusCode !== 206) {
        return res.status(502).json({ error: `CDN returned ${cdnRes.statusCode}` });
      }
      cdnRes.pipe(res);
    }).on('error', (err) => {
      console.error('CDN stream error:', err.message);
      if (!res.headersSent) res.status(502).json({ error: err.message });
    });
  } catch (error) {
    console.error('Download error:', error.message);
    if (!res.headersSent) res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Download server running on http://localhost:${PORT}`);
  console.log(`  POST /api/info      - Get video info`);
  console.log(`  GET  /api/download/:id - Download video`);
});
