import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [], // Initialize as an empty array
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replace current feed with new data
    },
    removeFeed: (state, action) => {
      return null; // Clear the feed data
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions; // Export both actions
export default feedSlice.reducer; // Export the reducer
