import { Link } from 'react-router-dom';
import { FiPlay, FiHeart } from 'react-icons/fi';
import './Card.scss';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/player/video/${video?.id || '1'}`} className="video-card">
      <div className="card-thumbnail">
        <div className="thumbnail-placeholder">
          <FiPlay />
        </div>
        <div className="card-duration">10:30</div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{video?.title || 'Video Title'}</h3>
        <p className="card-meta">{video?.views || '10K'} views • {video?.date || '2 days ago'}</p>
      </div>
    </Link>
  );
};

export default VideoCard;
