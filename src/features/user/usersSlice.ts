import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

/*
const make_url = (endpoint: string): string => {
  return `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}${endpoint}`;
};
*/
/*
https://redux-toolkit.js.org/usage/usage-with-typescript/#type-safety-with-extrareducers
https://github.com/reduxjs/redux-toolkit/releases/tag/v1.3.0
https://github.com/reduxjs/redux-toolkit/blob/master/src/combinedTest.test.ts
https://github.com/reduxjs/redux-toolkit/releases/tag/v1.3.0-alpha.5
*/

export type LoginFormData = {
  email: string;
  password: string;
};

export const userLoginThunk = createAsyncThunk(
  'users/login',
  async (logindata: LoginFormData, { rejectWithValue }) => {
    // Note: you should try catch here and use `rejectWithValue` if you have errors
    const {
      data: { user, token }
    } = await axios.post<UserState>(
      `${process.env.REACT_APP_API_URL}/subscriber-login`,
      {
        email: logindata.email,
        password: logindata.password
      }
    );
    localStorage.setItem('token', token);
    return { user, token };
  }
);

export const logoutUser = createAsyncThunk('users/logout', async () => {
  try {
    // just for testing, always return true
    await axios.delete('/api/profiles/auth');
  } catch (err) {}

  localStorage.clear();
});

const initialState = {
  user: {
    id: 0,
    username: '',
    email: ''
  },
  token: ''
} as UserState;

const slice = createSlice({
  name: 'users',
  initialState, // loadState(), // Note: it's normally a good idea just to initialize an object {}
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending, (state, action) => {})
      .addCase(userLoginThunk.fulfilled, (state, { payload: { user } }) => {
        state.user = user;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        return initialState;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      });
  }
});

export default slice.reducer;
// normally you'd just export these individually so you don't have to import all userActions. can be helpful.
export const userActions = { ...slice.actions, userLoginThunk };

export const selectUser = (state: RootState) => state.user.user;

// export const { logout } = slice.actions; // this is the common pattern as mentioned above.
export interface User {
  id: number;
  username: string;
  email: string;
}
export interface UserState {
  user: User;
  token: string;
}
