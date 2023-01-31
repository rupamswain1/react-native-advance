import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import qs from 'qs';
import axios from "axios";
const INITITAL_STATE={
    jobs:[]
}
export const searchJobs=createAsyncThunk(
    'jobs/searchJobs',
    async(region,thunkAPI)=>{
        console.log(region)
        try{
            // const rootUrl="http://api.indeed.com/apisearch?";
            const rootUrl="http://authenticjobs.com/api/docs";
            let {status}=await Permissions.askAsync(Permissions.LOCATION)
            console.log(status);
            Location.setGoogleApiKey("AIzaSyBzMWgRkrx-qR7SYQ34upzisb9-0fXXkPE")
            let address=await Location.reverseGeocodeAsync(region);
           
            // const JOB_QUERY_PARAMS={
            //     publisher:'4201738803816157',
            //     format:'json',
            //     v:'2',
            //     latlong:1,
            //     radius:10,
            //     q:'javascript'
            // }
            const JOB_QUERY_PARAMS={
                api_key:'4201738803816157',
                method:"aj.jobs.search",
                perpage:'10',
                format:'json',
            }
            const buildURL=()=>{
               const query=qs.stringify({...JOB_QUERY_PARAMS})
               
               return `${rootUrl}${query}`
            }
          const url=buildURL()
          console.log(url)
          const {data}=await axios.get(url)
            return data;
        }
        catch(e){
            console.log(e);
            throw new Error(e);
        }
    }
)
const jobReducer=createSlice({
    name:'jobs',
    initialState:INITITAL_STATE,
    reducer:{

    },
    extraReducers:(builder)=>{
        builder.addCase(searchJobs.fulfilled,(state,action)=>{
            console.log(action)
        })
    }
})

export default jobReducer.reducer