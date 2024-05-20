import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  id: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post(
        '/profile',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error('Problème de connexion');
      }
      const data = response.data.body;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ token, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        '/profile',
        {
          firstName,
          lastName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchUser cases
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.id = action.payload.id;
      })
      // editUser cases
      .addCase(editUser.fulfilled, (state, action) => {
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
      });
  },
});

export default userSlice.reducer;
