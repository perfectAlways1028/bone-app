import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import auth from '../modules/auth/reducers/AuthReducer';
import users from '../modules/home/reducers/UserReducer';

export default combineReducers({
  // ## Generator Reducers
  app,
  auth,
  users
});
