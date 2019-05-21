import { api } from '../../../config';
import * as ACTION_TYPES from './ActionTypes';
import { AsyncStorage } from 'react-native';


export function  getNearByUsers(data) {

    let params = {
        id : data.id,
        limit : data.limit,
        offset : data.offset,
        online: data.online
    }
    return {
      type: ACTION_TYPES.GET_NEARBY_USERS,
      request: {
        url: `${api.baseURL}/api/user/${params.id}/nearbyUsers/limit/${params.limit}/offset/${params.offset}/online/${params.online}`,
      },
    }
}

export function getNewUsers(data) {
    console.log("Action-getNewUsers");
    let params = {
        id : data.id,
        limit : data.limit,
        offset : data.offset
    }
    return {
        type: ACTION_TYPES.GET_NEW_USERS,
        request: {
          url: `${api.baseURL}/api/user/${params.id}/newUsers/limit/${params.limit}/offset/${params.offset}`,
        },
      }
} 
  

export function getWatchList(data) {
    console.log("Action-getWatchList");
    let params = {
        id : data.id,
        limit : data.limit, 
        offset : data.offset,
        online: data.online
    }
    return {
        type: ACTION_TYPES.GET_WATCHLIST_USERS,
        request: {
          url: `${api.baseURL}/api/user/${params.id}/watchlist/limit/${params.limit}/offset/${params.offset}/online/${params.online}`,
        },
      }
}


export function getFilterUsers(data, filterSettings) {
    console.log("Action-getFilterUsers");
    let params = {
        id : data.id,
        limit : data.limit, 
        offset : data.offset,
        online: data.online
    }
    return {
        type: ACTION_TYPES.GET_FILTER_USERS,
        request: {
          url: `${api.baseURL}/api/user/${params.id}/filter/limit/${params.limit}/offset/${params.offset}/online/${params.online}`,
          method: 'post',
          body: JSON.stringify(filterSettings)
        },
      }
}