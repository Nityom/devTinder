import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice'; 
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); 

  const getFeed = async () => {
    if (feed && feed.length > 0) return; 
    try {
      const res = await axios.get( BASE_URL+ '/feed', { withCredentials: true });
      
      // Check the response data for debugging
      console.log('Fetched feed data:', res?.data);

      // Dispatching the feed data to the Redux store
      dispatch(addFeed(res?.data)); 
    } catch (err) {
      console.error('Error fetching feed:', err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); 

  // Debugging feed length and data
  useEffect(() => {
    console.log('Current feed length:', feed.length);
    console.log('Current feed data:', feed);
  }, [feed]);

  return (
    <>
      {feed && feed.length > 0 ? (
        <div className="flex justify-center my-10">
          <UserCard user={feed[0]} />
        </div>
      ) : (
        <div className="flex justify-center my-10">
          <p>Loading feed...</p>
        </div>
      )}
    </>
  );
};

export default Feed;
