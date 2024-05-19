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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.id = action.payload.id;
    });
  },
});

export default userSlice.reducer;
