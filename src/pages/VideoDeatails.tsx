import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { selectVideo } from '../redux/videosSlicer';
import '../styles/style.css';
import Header from '../components/Header';

const VideoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const selectedVideo = useSelector((state: RootState) => state.videos.selectedVideo);

  useEffect(() => {
    if (id) {
      dispatch(selectVideo(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!selectedVideo) {
      navigate('/404', { replace: true }); 
    }
  }, [selectedVideo, navigate]);

  if (!selectedVideo) {
    return null; 
  }

  const handleFilterChange = (sortBy: 'date' | 'views', sortOrder: 'asc' | 'desc', keyword: string) => {
    console.log('Фильтры изменены:', { sortBy, sortOrder, keyword });
    navigate('/'); 
  };
  const getBorderColor = () => {
    const now = new Date();
    const videoDate = new Date(selectedVideo.date);
    const diffDays = Math.ceil(
      (now.getTime() - videoDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 7) return '#2F80ED'; 
    if (diffDays <= 30) return '#27AE60'; 
    if (diffDays <= 180) return '#F2C94C'; 
    return '#EB5757'; 
  };

  return (
    <div>
      <Header onFilterChange={handleFilterChange} />
      <div className="main_conteiner">
      <div className="video_details">
        <button
          className="back_button"
          onClick={() => navigate('/')}
          aria-label="Вернуться на главную"
          style={{
            background: `${getBorderColor()}`, 
          }}>
          <span>&lt;</span>
        </button>
        <div className="container_video_details" style={{
        boxShadow: `0 4px 6px ${getBorderColor()}`, 
      }}>
          <img className='video_img' src={selectedVideo.thumbnail} alt={selectedVideo.title} />
          <div className="video_information_conteiner" style={{
        borderBottom: `6px solid ${getBorderColor()}`, 
      }}>
            <div className='title_container'>
            <h1>{selectedVideo.title}</h1>
            <p>{new Date(selectedVideo.date).toLocaleDateString()}</p>
            </div>
            <strong>Описание: </strong>
            <p> {selectedVideo.description}</p>
            <div className="video_inform" id='video_inform_details'>
              <div><img className="icons" src="/viewed.png" alt="views" /> {selectedVideo.views}</div>
              <div><img className="icons" src="/liked.png" alt="likes" /> {selectedVideo.likes}</div>
              <div><img className="icons" src="/dislike.png" alt="dislikes" /> {selectedVideo.dislikes}</div>
              <div><img className="icons" src="/Grouped.png" alt="comments" /> {selectedVideo.comment}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VideoDetails;
