import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { likeJob } from '../redux/reducer/jobReducer';
import Deck from '../components/Deck/Deck';

const DeckScreen = () => {
  const { jobs, likedJobs } = useSelector((state) => state.jobReducer);
  const dispatch = useDispatch();
  console.log(likedJobs);
  const swipeRight = (jobData) => {
    dispatch(likeJob(jobData));
  };
  return (
    <View>
      <Deck data={jobs} onSwipeRight={(item) => swipeRight(item)} />
    </View>
  );
};

export default DeckScreen;
