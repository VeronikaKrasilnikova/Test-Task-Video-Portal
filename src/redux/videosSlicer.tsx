import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: string;
  likes: string;
  dislikes: string;
  comment: string;
  date: string;
}

interface VideosState {
  videos: Video[];
  currentPage: number;
  videosPerPage: number;
  selectedVideo: Video | null; 
}

const initialState: VideosState = {
  videos: [],
  currentPage: 1,
  videosPerPage: 12, 
  selectedVideo: null,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setVideosPerPage: (state, action: PayloadAction<number>) => {
      state.videosPerPage = action.payload;
    },
    selectVideo: (state, action: PayloadAction<string>) => {
      state.selectedVideo =
        state.videos.find((video) => video.id === action.payload) || null;
    },
  },
});

export const { setVideos, setCurrentPage, setVideosPerPage, selectVideo } =
  videosSlice.actions;

export default videosSlice.reducer;
