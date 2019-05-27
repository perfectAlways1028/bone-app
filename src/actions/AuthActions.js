import { api } from '../config';
import * as ACTION_TYPES from './ActionTypes';
import { AsyncStorage } from 'react-native';
import { showToast } from '../helpers';

export function login(credential) {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.LOGIN });
        const body = credential;
        const request = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            url: `${api.baseURL}/api/user/login`,
            method: 'post',
            body: JSON.stringify(body),
          };
        console.log("login- request", request);
        fetch(request.url, request)
          .then((res) => {
            console.log(res);
            if(res.ok) {
                res
                .json()
                .then((response)=> {
                    _persistAuth(response.data)
                    .then(() => dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, auth: response.data }))
                    .then(()=>{

                    })
                    .catch(console.error);
                })
            } else {
                dispatch({ type: ACTION_TYPES.LOGIN_FAILURE });
            }
          })   
    }
}

export function signup(credential) {
  return (dispatch, getState) => {
      dispatch({ type: ACTION_TYPES.SIGNUP });
      const body = credential;
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url: `${api.baseURL}/api/user/signup`,
          method: 'post',
          body: JSON.stringify(body),
        };
      console.log("signup- request", request);
      fetch(request.url, request)
        .then((res) => {
          console.log(res);
          if(res.ok) {
              res
              .json()
              .then((response)=> {
                  _persistAuth(response.data)
                  .then(() => dispatch({ type: ACTION_TYPES.SIGNUP_SUCCESS, auth: response.data }))
                  .then(()=>{

                  })
                  .catch(console.error);
              })
          } else {
              res
              .json()
              .then((result => {
                if(result && result.message)
                showToast(result.message, 'short');
              }))
              .catch(console.error);
              dispatch({ type: ACTION_TYPES.SIGNUP_FAILURE });
          }
        })   
  }
}


export function _persistAuth(auth) {
    return AsyncStorage.setItem('auth', JSON.stringify(auth));
}

export function loadUserProfile(userId) {
  return {
    type: ACTION_TYPES.LOAD_PROFILE,
    request: {
      url: `${api.baseURL}/api/user/${userId}`,
    },
  }
}

export function loadMyGallery(userId) {
  return {
    type: ACTION_TYPES.GET_MY_GALLERY,
    request: {
      url: `${api.baseURL}/api/user/${userId}/gallery/${userId}`,
    },
  }
}