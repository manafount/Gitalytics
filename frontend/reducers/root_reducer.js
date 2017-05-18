import { combineReducers } from 'redux';

import UserReducer from './user_reducer';

const RootReducer = combineReducers({
  user: UserReducer
});

export default RootReducer;
