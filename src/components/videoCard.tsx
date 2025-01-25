import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: string;
  likes: string;
  dislikes: string;
  comment: string;
  date: string;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnail,
  views,
  likes,
  dislikes,
  comment,
  date,
  onClick,
}) => {
  const navigate = useNavigate();

  const getBorderColor = () => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffDays = Math.ceil(
      (now.getTime() - videoDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 7) return '#2F80ED'; 
    if (diffDays <= 30) return '#27AE60'; 
    if (diffDays <= 180) return '#F2C94C'; 
    return '#EB5757'; 
  };

  const handleDetailsClick = () => {
    navigate(`/video/${id}`); 
  };

  return (
    <div
      className="video_card"
      onClick={handleDetailsClick}
      style={{
        borderBottom: `6px solid ${getBorderColor()}`, 
      }}>
      <img className="video_img" src={thumbnail} alt={title} />
      <div className="video_inform">
        <div>
          <img className="icons" src="/viewed.png" alt="views" /> {views}
        </div>
        <div>
          <img className="icons" src="/liked.png" alt="likes" /> {likes}
        </div>
        <div>
          <img className="icons" src="/dislike.png" alt="dislikes" /> {dislikes}
        </div>
        <div>
          <img className="icons" src="/Grouped.png" alt="comments" /> {comment}
        </div>
      </div>
      <h3 className="title">{title}</h3>
      <p className="title">{new Date(date).toLocaleDateString()}</p>
      <button
        className="video_btn"
        onClick={(e) => {
          e.stopPropagation();
          handleDetailsClick();
        }}> Далее...
      </button>
    </div>
  );
};

export default VideoCard;

