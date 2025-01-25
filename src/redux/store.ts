import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './videosSlicer';

export const store = configureStore({
  reducer: {
    videos: videosReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
