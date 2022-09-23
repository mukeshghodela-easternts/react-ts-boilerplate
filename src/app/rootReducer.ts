import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import {
  default as userReducer,
  logoutUser
} from '../features/user/usersSlice';

const createRootReducer = () => {
  const allReducers = combineReducers({
    user: userReducer
  });

  const appReducer = (state: any, action: AnyAction) => {
    if (logoutUser.fulfilled.match(action)) {
      state = undefined;
    }

    return allReducers(state, action);
  };

  return appReducer;
};

const rootReducer = createRootReducer();

export default rootReducer;
