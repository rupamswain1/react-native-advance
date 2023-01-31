import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from './rootReducer'
import authReducer from './reducer/authReducer';
import jobReducer from './reducer/jobReducer';

const store = configureStore({
  reducer: {
    authReducer:authReducer,
    jobReducer:jobReducer
  },
 
})

export default store
 