import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer, // Handles user-related state
    feed: feedReducer, // Handles feed-related state
  },
});

export default appStore;
