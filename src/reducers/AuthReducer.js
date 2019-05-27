import * as ACTION_TYPES from '../actions/ActionTypes';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  user: null,
  token: null,
  gallery: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return { ...state, isLoading: true, success: false, error: null };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, isLoading: false, success: true, error: null, user: action.auth.user, token: action.auth.token };
    case ACTION_TYPES.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: 'An error occured', success: false };
    case ACTION_TYPES.SIGNUP:
      return { ...state, isLoading: true, success: false, error: null };
    case ACTION_TYPES.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, success: true, error: null, user: action.auth.user, token: action.auth.token };
    case ACTION_TYPES.SIGNUP_FAILURE:
        return { ...state, isLoading: false, error: 'An error occured', success: false };
    case ACTION_TYPES.LOAD_PROFILE:
      return { ...state, isLoading: true, success: false, error: null };
    case ACTION_TYPES.LOAD_PROFILE_SUCCESS:
    
      return { ...state, isLoading: false, success: true, error: null, user: action.data.data.user };
    case ACTION_TYPES.LOAD_PROFILE_FAILURE:
    default:
      return state;
  }
};
