import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaSoundcloud,
  FaVimeo,
  FaTwitch,
  FaGlobe,
} from 'react-icons/fa';
import { SiDailymotion, SiBandcamp } from 'react-icons/si';

const platformConfig = {
  youtube:        { icon: FaYoutube,     color: '#FF0000',    label: 'YouTube' },
  'youtu.be':     { icon: FaYoutube,     color: '#FF0000',    label: 'YouTube' },
  instagram:      { icon: FaInstagram,   color: '#E4405F',    label: 'Instagram' },
  tiktok:         { icon: FaTiktok,      color: '#000000',    label: 'TikTok' },
  twitter:        { icon: FaTwitter,     color: '#1DA1F2',    label: 'Twitter' },
  x:              { icon: FaTwitter,     color: '#1DA1F2',    label: 'X (Twitter)' },
  facebook:       { icon: FaFacebook,    color: '#1877F2',    label: 'Facebook' },
  fb:             { icon: FaFacebook,    color: '#1877F2',    label: 'Facebook' },
  soundcloud:     { icon: FaSoundcloud,  color: '#FF3300',    label: 'SoundCloud' },
  vimeo:          { icon: FaVimeo,       color: '#1AB7EA',    label: 'Vimeo' },
  dailymotion:    { icon: SiDailymotion, color: '#0B0B0B',    label: 'Dailymotion' },
  twitch:         { icon: FaTwitch,      color: '#9146FF',    label: 'Twitch' },
  bandcamp:       { icon: SiBandcamp,    color: '#629AA9',    label: 'Bandcamp' },
};

const formatColors = {
  video: { bg: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', label: 'Video' },
  audio: { bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', label: 'Audio' },
  image: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', label: 'Image' },
};

export function getPlatformIcon(source) {
  if (!source || source === 'local') return null;
  const key = source.toLowerCase();
  return platformConfig[key] || null;
}

export function getFormatStyle(type) {
  return formatColors[type] || { bg: 'rgba(100, 100, 100, 0.15)', color: '#666', label: 'File' };
}

export function detectPlatformFromUrl(url) {
  if (!url) return null;
  for (const [key, config] of Object.entries(platformConfig)) {
    if (url.toLowerCase().includes(key)) return config;
  }
  return null;
}

export function extractPlatformFromSource(source) {
  if (!source || source === 'local') return null;
  const key = source.toLowerCase();
  return platformConfig[key] || null;
}

export default platformConfig;
