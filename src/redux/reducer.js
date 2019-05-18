import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import auth from '../modules/auth/reducers/AuthReducer';

export default combineReducers({
  // ## Generator Reducers
  app,
  auth
});
