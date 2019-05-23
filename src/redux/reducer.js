import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// ## Generator Reducer Imports
import app from '../modules/AppState';
import auth from '../modules/auth/reducers/AuthReducer';
import users from '../modules/home/reducers/UserReducer';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['isLoading'],
};

const usersPersistConfig = {
  key: 'users',
  storage: storage,
  blacklist: ['isLoading', 'success', 'error', 'searchUsers'],
};

export default combineReducers({
  // ## Generator Reducers
  app: persistReducer(getNormalConfig('app', []), app),
  auth: persistReducer(authPersistConfig, auth),
  users,
});


function getNormalConfig(name, blackList) {
  return {
    key: name,
    storage: storage,
    blacklist: blackList,
  };
}