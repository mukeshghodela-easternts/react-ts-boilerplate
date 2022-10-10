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
    try {
      const data = await axios.post<{ data: UserState }>(
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

export const logoutUser = createAsyncThunk('users/logout', async () => {
  try {
    // just for testing, always return true
    await axios.delete('/api/profiles/auth');
  } catch (err) {}

  localStorage.clear();
});

const initialState = {
  user: <UserState>{
    authorization: '',
    refresh_token: '',
    id: '',
    company_id: '',
    title: '',
    first_name: '',
    last_name: '',
    job_title: '',
    user_type: '',
    user_type_text: 'n',
    email: '',
    is_allow_purchase_datapack: '',
    subscriber_role_id: '',
    subscriber_role: {
      id: '',
      name: '',
      guard_name: ''
    },
    profile_obj: {
      main: '',
      default: '',
      mobile: '',
      laptop: '',
      tablet: '',
      thumbnail: '',
      original: ''
    },
    profile_name: '',
    status: '',
    status_text: '',
    email_verified_at: '',
    last_login_time: '',
    stripe_customer_id: '',
    zoho_contact_id: '',
    qb_customer_id: '',
    no_api_permissions: [],
    subscription_status: '',
    subscription_status_text: '',
    subscription: {
      company_id: '',
      expiry_date: '',
      id: '',
      name: '',
      payment_status: '',
      payment_status_text: '',
      plan: {
        id: '',
        stripe_plan_id: '',
        stripe_product_id: '',
        name: '',
        price: '',
        concurrent_user: '',
        total_user: '',
        vehicle_data_library_access: '',
        vehicle_data_library_access_text: '',
        vehicle_data_library_discount: '',
        no_of_complimentary_data_pack: '',
        future_plan: '',
        future_plan_text: '',
        line_of_credit: '',
        line_of_credit_text: '',
        status: '',
        status_text: '',
        total_subscriptions: '',
        qb_item_id: '',
        pro_rate: '',
        used_amount: '',
        scan_data_library: '',
        introductory_discount: '',
        introductory_text: '',
        feature_pdf_original: '',
        feature_pdf: '',
        company_plan: {
          status: '',
          status_text: '',
          is_disable: ''
        },
        plan_details: []
      },
      plan_id: '',
      self_ref_id: '',
      start_date: '',
      stripe_status: '',
      stripe_customer_id: '',
      user_id: ''
    },
    cancel_request_flag: {
      is_auto_generated_invoice: false,
      plan: { id: '', name: '', total_user: '' },
      visibility: '',
      request_status: '',
      request_status_text: ''
    }
  },
  token: ''
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
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      });
  }
});

export default slice.reducer;
// normally you'd just export these individually so you don't have to import all userActions. can be helpful.
export const userActions = { ...slice.actions, userLoginThunk };

export const selectUser = (state: RootState) => state.user;

// export const { logout } = slice.actions; // this is the common pattern as mentioned above.
export interface User {
  id: number;
  username: string;
  email: string;
}
export interface IUserLightResponse {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  qb_customer_id: string;
}
export interface IUserFullResponse extends IUserLightResponse {
  company_id: string;
  title: string;
  first_name: string;
  last_name: string;
  job_title: string;
  user_type: string;
  user_type_text: string;
  email: string;
  subscriber_role_id: string;
  subscriber_role: {
    id: string;
    name: string;
    guard_name: string;
  };
  profile_obj: {
    main: string;
    default: string;
    mobile: string;
    laptop: string;
    tablet: string;
    thumbnail: string;
    original: string;
  };
  profile_name: string;
  status: string;
  status_text: string;
  last_login_time: string;
}

export interface UserState extends IUserFullResponse {
  is_allow_purchase_datapack: string;
  subscription: {
    company_id: string;
    expiry_date: string;
    user_id: string;
    id: string;
    name: string;
    payment_status: string | null;
    payment_status_text: string | null;
    plan: any;
    plan_id: string;
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
    plan: string | any;
    visibility: string;
    request_status: string;
    request_status_text: string;
  };
}
