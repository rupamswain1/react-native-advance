import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';

const rootReducer = combineReducers({
    reducer:{
        authReducer:authReducer
    }
})

export default rootReducer
