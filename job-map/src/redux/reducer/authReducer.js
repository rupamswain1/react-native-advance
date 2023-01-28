import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
const INITITAL_STATE={
    token:null,
    isAuthorized:false
}

export const authUser=createAsyncThunk(
    'auth/loginUser',
    async(args,thunkAPI)=>{
     
        const token=JSON.parse(await AsyncStorage.getItem("login_token"))
        if(token){
            return {token,isAuthorized:true}
        }
        else{
            try {
             console.log(Facebook.initializeAsync)
            console.log(await Facebook.initializeAsync({
                appId: '515034087364254'
              }));
              
                const { type, token} =await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                  });
                if (type === 'success') {
                  // Get the user's name using Facebook's Graph API
                  const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                  await AsyncStorage.setItem("login_token",JSON.stringify(token))
                  return {token,isAuthorized:true}
                } else {
                  // type === 'cancel'
                  throw new Error('login failed')
                }
              } catch (err) {
                console.log('error message',err)
                    return new Error(err.message)
              }
            
        }
    }
)

const authReducer = createSlice({
  name: 'auth',
  initialState: INITITAL_STATE,
  reducers: {
  
  },
  extraReducers:(builder)=>{
    builder.addCase(authUser.fulfilled,(state,action)=>{
        console.log('condition is fulfilled',action)
        state.token=action.payload.token;
        state.isAuthorized=action.payload.isAuthorized;
    });
    builder.addCase(authUser.rejected,(state,action)=>{
        state.token=null;
        state.isAuthorized=false;
        console.log(action)
    })
  }
})

export const { increment, decrement } = authReducer.actions
export default authReducer.reducer
