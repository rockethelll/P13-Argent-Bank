import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './authenticationSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: combineReducers({
    authentication: authenticationReducer,
    user: userReducer,
  }),
});
