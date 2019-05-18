import { api } from '../../../config';
import * as ACTION_TYPES from './ActionTypes';
import { AsyncStorage } from 'react-native';

export function login(credential) {
    return (dispatch, getState) => {
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
                .then((authStrategy)=> {
                    _persistAuth(authStrategy)
                    .then(() => dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, auth: authStrategy }))
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

export function _persistAuth(auth) {
    return AsyncStorage.setItem('auth', JSON.stringify(auth));
  }