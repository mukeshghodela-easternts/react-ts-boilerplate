import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AnyObject } from 'yup/lib/types';
import { RootState } from '../../app/store';
import { IPagination } from '../../common';
import { ICurrentUserData, IUserFullResponse } from '../../types/user';
import { getSortType } from '../../utils/helper';
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
    try {
      const data = await axios.post<{ data: ICurrentUserData }>(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: logindata.email,
          password: logindata.password
        }
      );
      return data.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response);
    }
  }
);

export const userListThunk = createAsyncThunk(
  'users/userList',
  async (
    param: {
      pagination: IPagination;
      additionalParams?: { [index: string]: string | boolean };
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await axios.get<AnyObject>(
        `${process.env.REACT_APP_API_URL}/users?page=${
          param.pagination.page ? param.pagination.page : 1
        }&per_page=${
          param.pagination.limit ? param.pagination.limit : ''
        }&search=${
          param.pagination.query ? param.pagination.query : ''
        }&filter=${
          param.pagination.filter ? param.pagination.filter : ''
        }&is_light=${
          param.pagination.isLight ? param.pagination.isLight : ''
        }&sort=${
          param.pagination.orderBy ? param.pagination.orderBy : ''
        }&order_by=${param.pagination.orderType}`,
        {
          params: param.additionalParams ? param.additionalParams : {}
        }
      );
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response);
    }
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
  user: <ICurrentUserData>{
    authorization: '',
    dob: '',
    email: '',
    email_verified_at: '',
    gender: '',
    gender_text: '',
    id: '',
    name: '',
    permissions: [],
    profile: '',
    profile_original: '',
    profile_thumbnail: '',
    role: {
      created_at: '',
      created_by: '',
      deleted_at: '',
      guard_name: '',
      id: '',
      landing_page: '',
      name: '',
      updated_at: '',
      updated_by: ''
    },
    role_id: '',
    sample_excels: [
      {
        sample_brand: '',
        sample_color: '',
        sample_product: '',
        sample_supplier: '',
        sample_user: 'string'
      }
    ],
    status: '',
    status_text: '',
    user_galleries: [],
    user_pictures: []
  },
  token: '',
  pagination: {
    query: '',
    page: 1,
    limit: 10,
    orderBy: '',
    descending: 'default',
    filter: ''
  },
  userList: <IUserFullResponse[]>[]
};

const slice = createSlice({
  name: 'users',
  initialState, // loadState(), // Note: it's normally a good idea just to initialize an object {}
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending, (state, action) => {})
      .addCase(userLoginThunk.fulfilled, (state, { payload: { data } }) => {
        state.user = data;
        state.token = data.authorization;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        return initialState;
      })
      .addCase(userListThunk.pending, (state, action) => {})
      .addCase(userListThunk.fulfilled, (state, { payload: { data } }) => {
        state.userList = data.data;
      })
      .addCase(userListThunk.rejected, (state, action) => {
        return initialState;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      });
  }
});

export default slice.reducer;
// normally you'd just export these individually so you don't have to import all userActions. can be helpful.
export const userActions = { ...slice.actions, userLoginThunk, userListThunk };

export const selectUser = (state: RootState) => state.user;
export const selectAllUsers = (state: RootState) => state.user.userList;

// export const { logout } = slice.actions; // this is the common pattern as mentioned above.
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserState extends IUserFullResponse {
  is_allow_purchase_datapack: string;
  subscription: {
    company_id: string;
    expiry_date: string;
    id: string;
    name: string;
    payment_status: string | null;
    payment_status_text: string | null;
    user: any;
    user_id: string;
    self_ref_id: string | null;
    start_date: string;
    stripe_status: string | null;
    stripe_customer_id: string;
  };
  authorization: string;
  refresh_token: string;
  no_api_permissions: string[];
  subscription_status: string;
  subscription_status_text: string;
  email_verified_at: string;
  last_login_time: string;
  stripe_customer_id: string;
  zoho_contact_id: string;
  cancel_request_flag: {
    is_auto_generated_invoice: boolean;
    user: string | any;
    visibility: string;
    request_status: string;
    request_status_text: string;
  };
}
