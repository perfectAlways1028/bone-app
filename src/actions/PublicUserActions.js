import { api } from '../config';
import * as ACTION_TYPES from './ActionTypes';
import { AsyncStorage } from 'react-native';
import { showToast } from '../helpers';

export function loadUserProfile(userId, otherUserId) {
    return {
      type: ACTION_TYPES.LOAD_PUBLIC_PROFILE,
      request: {
        url: `${api.baseURL}/api/user/${userId}/profile/${otherUserId}`,
      },
      
    }
}

export function blockUser(fromUserId, toUserId) {
    return {
        type: ACTION_TYPES.BLOCK_USER,
        request: {
            url: `${api.baseURL}/api/interaction/${fromUserId}/block/${toUserId}`,
            method: 'post'
        }
    }
}

export function unblockUser(fromUserId, toUserId) {
    return {
        type: ACTION_TYPES.UNBLOCK_USER,
        request: {
            url: `${api.baseURL}/api/interaction/${fromUserId}/unblock/${toUserId}`,
            method: 'post'
        }
    }
}

export function watchUser(fromUserId, toUserId) {
    return {
        type: ACTION_TYPES.WATCH_USER,
        request: {
            url: `${api.baseURL}/api/interaction/${fromUserId}/watch/${toUserId}`,
            method: 'post'
        }
    }
}

export function unwatchUser(fromUserId, toUserId) {
    return {
        type: ACTION_TYPES.UNWATCH_USER,
        request: {
            url: `${api.baseURL}/api/interaction/${fromUserId}/unwatch/${toUserId}`,
            method: 'post'
        }
    }
}

export function boneUser(fromUserId, toUserId) {
    return {
        type: ACTION_TYPES.BONE_USER,
        request: {
            url: `${api.baseURL}/api/interaction/${fromUserId}/bone/${toUserId}`,
            method: 'post'
        }
    }
}

export function unboneUser(fromUserId, toUserId) {
    return {
        type: ACTION_TYPES.UNBONE_USER,
        request: {
            url: `${api.baseURL}/api/interaction/${fromUserId}/unbone/${toUserId}`,
            method: 'post'
        }
    }
}
