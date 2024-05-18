import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  token: null,
  loading: 'idle',
  error: null,
  isAuthenticated: false,
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;
export const { logout } = authenticationSlice.actions;
