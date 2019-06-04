import * as ACTION_TYPES from '../actions/ActionTypes';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  user: null,
  userToUser: null,
  gallery:[]
};

export default (state = INITIAL_STATE, action) => {
    var userToUser = {}
    switch (action.type) {
        case ACTION_TYPES.LOAD_PUBLIC_PROFILE:
        return { ...state, isLoading: true, success: false, error: null, currentAction: action.type };
        case ACTION_TYPES.LOAD_PUBLIC_PROFILE_SUCCESS:
        return { ...state, isLoading: false, success: true, error: null, user: action.data.data.user, userToUser: action.data.data.userToUser, currentAction: action.type };
        case ACTION_TYPES.LOAD_PUBLIC_PROFILE_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type };
        

        case ACTION_TYPES.BONE_USER:
            return { ...state, isLoading: true, success: false, error: null, currentAction: action.type };
        case ACTION_TYPES.BONE_USER_SUCCESS:
            userToUser ={...(state.userToUser || {}), isBoning: true}
            return { ...state, isLoading: false, success: true, error: null, userToUser, currentAction: action.type};
        case ACTION_TYPES.BONE_USER_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type};
                        
        case ACTION_TYPES.UNBONE_USER:
            return { ...state, isLoading: true, success: false, error: null, currentAction: action.type };
        case ACTION_TYPES.UNBONE_USER:
            userToUser ={...(state.userToUser || {}), isBoning: false}
            return { ...state, isLoading: false, success: true, error: null, userToUser, currentAction: action.type};
        case ACTION_TYPES.UNBONE_USER_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type};
                                
        case ACTION_TYPES.BLOCK_USER:
            return { ...state, isLoading: true, success: false, error: null , currentAction: action.type};
        case ACTION_TYPES.BLOCK_USER_SUCCESS:
            userToUser ={...(state.userToUser || {}), isBlocking: true}
            return { ...state, isLoading: false, success: true, error: null, userToUser, currentAction: action.type};
        case ACTION_TYPES.BLOCK_USER_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type};
                
        case ACTION_TYPES.UNBLOCK_USER:
            return { ...state, isLoading: true, success: false, error: null , currentAction: action.type};
        case ACTION_TYPES.UNBLOCK_USER_SUCCESS:
            return { ...state, isLoading: false, success: true, error: null, currentAction: action.type};
        case ACTION_TYPES.UNBLOCK_USER_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type};

        case ACTION_TYPES.WATCH_USER:
            return { ...state, isLoading: true, success: false, error: null, currentAction: action.type };
        case ACTION_TYPES.WATCH_USER_SUCCESS:
            userToUser ={...(state.userToUser || {}), isWatching: true}
            return { ...state, isLoading: false, success: true, error: null, userToUser, currentAction: action.type};
        case ACTION_TYPES.WATCH_USER_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type};

        case ACTION_TYPES.UNWATCH_USER:
            return { ...state, isLoading: true, success: false, error: null , currentAction: action.type};
        case ACTION_TYPES.UNWATCH_USER_SUCCESS:
            userToUser ={...(state.userToUser || {}), isWatching: false}
            return { ...state, isLoading: false, success: true, error: null, userToUser, currentAction: action.type};
        case ACTION_TYPES.UNWATCH_USER_FAILURE:
            return { ...state, isLoading: false, error: 'An error occured', success: false, currentAction: action.type};         
      default:
        return state;
    }
  };
  