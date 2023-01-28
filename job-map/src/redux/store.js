import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from './rootReducer'
import authReducer from './reducer/authReducer';

const store = configureStore({
  reducer: {
    authReducer:authReducer
  },
 
})

export default store
 