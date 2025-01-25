import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setVideos, setCurrentPage, setVideosPerPage } from '../redux/videosSlicer';
import Header from '../components/Header';
import VideoCard from '../components/videoCard';
import Pagination from '../components/Pagination';
import '../styles/style.css';

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { videos, currentPage, videosPerPage } = useSelector((state: RootState) => state.videos);

  const [sortBy, setSortBy] = useState<'date' | 'views' | ''>(''); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  useEffect(() => {
    setSortBy('');
    setSortOrder('asc');
    setFilterKeyword('');
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const data = await response.json();

        const videos = data.map((video: any) => ({
          id: video.id,
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnail: video.snippet.thumbnails.high.url,
          views: Number(video.statistics.viewCount),
          likes: Number(video.statistics.likeCount),
          dislikes: Number(video.statistics.dislikeCount),
          comment: Number(video.statistics.commentCount),
          date: new Date(video.snippet.publishedAt), 
        }));

        dispatch(setVideos(videos));
      } catch (error) {
        console.error('Ошибка загрузки видео:', error);
      }
    };

    fetchVideos();
  }, [dispatch]);

  const filteredAndSortedVideos = videos
    .filter((video) =>
      video.title.toLowerCase().includes(filterKeyword.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === '') {
        return 0; 
      }

      const isAscending = sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'date') {
        return isAscending * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }

      if (sortBy === 'views') {
        return isAscending * (Number(a.views) - Number(b.views));
      }

      return 0;
    });

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredAndSortedVideos.slice(indexOfFirstVideo, indexOfLastVideo);


  const handleFilterChange = (
    newSortBy: 'date' | 'views' | '',
    newSortOrder: 'asc' | 'desc',
    keyword: string
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setFilterKeyword(keyword);
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      <Header onFilterChange={handleFilterChange} />
      <div className="main_conteiner">
        <div className="video_grid">
          {currentVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
              views={video.views}
              likes={video.likes}
              dislikes={video.dislikes}
              comment={video.comment}
              date={new Date(video.date).toISOString()} 
              onClick={() => console.log(`Видео ${video.id} открыто`)}
            />
          ))}
        </div>
        <Pagination
          totalItems={filteredAndSortedVideos.length} 
          currentPage={currentPage}
          itemsPerPage={videosPerPage}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
          onItemsPerPageChange={(itemsPerPage) => {
            dispatch(setVideosPerPage(itemsPerPage));
            dispatch(setCurrentPage(1)); 
          }}
        />
      </div>
    </div>
  );
};

export default MainPage;
