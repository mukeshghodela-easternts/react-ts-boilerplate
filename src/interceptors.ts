import axios from 'axios';
import { logoutUser } from './features/user/usersSlice';
import { StoreType } from './app/store';

export default {
  setup: (store: StoreType) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.response?.status === 401 &&
          error?.response?.config?.withCredentials
        ) {
          store.dispatch(logoutUser());
        }
        return Promise.reject(error);
      }
    );
    axios.interceptors.request.use((request) => {
      const token = store.getState().user.token;
      if (request?.headers && token) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }
      return request;
    });
  }
};
