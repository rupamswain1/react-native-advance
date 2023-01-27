import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITITAL_STATE={
    token:null,
    isAuthorized:false
}

const authUser=createAsyncThunk(
    'auth/loginUser',
    async(args,thunkAPI)=>{
        const token=JSON.parse(await AsyncStorage.getItem("login_token"))
        if(token){
            return {token,isAuthorized:true}
        }
        else{
            try {
                const { type, token, expirationDate, permissions, declinedPermissions } =
                  await Facebook.logInWithReadPermissionsAsync({
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
              } catch ({ message }) {
                    return new Error({message})
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
    builder.addCase(authUser.fullfilled,(state,action)=>{
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
