// import { apiSlice } from './apiSlice';
// const USERS_URL = '/api';

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/auth`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: 'POST',
//       }),
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/register`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     updateUser: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/profile`,
//         method: 'PUT',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useUpdateUserMutation,
// } = userApiSlice;

// userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const USERS_URL = '/api';

export const loginAsync = createAsyncThunk('user/login', async (data) => {
  const response = await fetch(`http://localhost:5000/api/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const result = await response.json();
  return result;
});

export const logoutAsync = createAsyncThunk('user/logout', async () => {
  const response = await fetch(`${USERS_URL}/logout`, {
    method: 'POST',
  });
  const result = await response.json();
  return result;
});

export const registerAsync = createAsyncThunk('user/register', async (data) => {
  const response = await fetch(`${USERS_URL}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
});

export const updateUserAsync = createAsyncThunk('user/update', async (data) => {
  const response = await fetch(`${USERS_URL}/profile`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
