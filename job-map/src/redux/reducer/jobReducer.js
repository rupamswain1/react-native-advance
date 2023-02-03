import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import qs from 'qs';
import axios from 'axios';
import { jobData } from '../../data';
const INITITAL_STATE = {
  jobs: [],
  likedJobs: [],
};
export const searchJobs = createAsyncThunk(
  'jobs/searchJobs',
  async (region, thunkAPI) => {
    console.log(region);
    try {
      //     const rootUrl="http://api.indeed.com/apisearch?";

      //     let {status}=await Permissions.askAsync(Permissions.LOCATION)

      //     //get the api key from https://developers.google.com/maps/documentation/javascript/get-api-key
      //     Location.setGoogleApiKey("")
      //     let address=await Location.reverseGeocodeAsync(region);

      //     const JOB_QUERY_PARAMS={
      //         publisher:'4201738803816157',
      //         format:'json',
      //         v:'2',
      //         latlong:1,
      //         radius:10,
      //         q:'javascript'
      //     }

      //     const buildURL=()=>{
      //        const query=qs.stringify({...JOB_QUERY_PARAMS})

      //        return `${rootUrl}${query}`
      //     }
      //   const url=buildURL()

      //     return data;
      //The above Api is not working so we will use fake data
      return [...jobData];
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
);
const jobReducer = createSlice({
  name: 'jobs',
  initialState: INITITAL_STATE,
  reducers: {
    clearJobs: (state) => {
      state.jobs = [];
    },
    likeJob: (state, action) => {
      console.log('likeJob Dispatched', action);
      const index = state.likedJobs.findIndex(({ jobId }) => {
        return jobId === action.payload.jobId;
      });
      if (index < 0) {
        state.likedJobs.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
    });
  },
});
export const { clearJobs, likeJob } = jobReducer.actions;
export default jobReducer.reducer;
