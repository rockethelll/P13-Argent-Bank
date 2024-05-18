import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import api from '@/api';

const initialState = {
  token: Cookies.get('token') || null,
  loading: 'idle',
  error: null,
  // isAuthenticated is true if the token exists !! is a way to convert a value to a boolean
  isAuthenticated: !!Cookies.get('token'),
};

export const login = createAsyncThunk(
  'authentication/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'success';
        state.token = action.payload.body.token;
        state.isAuthenticated = true;
        Cookies.set('token', action.payload.body.token, {
          secure: true, // cookie is only sent over HTTPS
          sameSite: 'strict', // cookie is not sent on cross-origin requests
          expires: 1 / 48, // 30 minutes
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;
export const { logout } = authenticationSlice.actions;
