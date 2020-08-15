import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { userState } from '../types/types';

const initialState: userState = {
    userInfo: {
        uid: '',
        createdAt: null,
        email: '',
        userName: '',
        lists: {},
        tags: []
    },
    error: null,
    loaded: false,
    loading: true,
    mobile: window.innerWidth <= 768
};

const setUserInfo = (state: userState, action: any) => {
    return updateObject(state, {
        userInfo: action.userInfo
    });
};

const fetchUserInfoFailed = (state: userState, action: any) => {
    return updateObject(state, {
        error: action.error
    });
};

const enableLoading = (state: userState, action: any) => {
    return updateObject(state, {
        loading: true
    });
};

const disableLoading = (state: userState, action: any) => {
    return updateObject(state, {
        loading: false
    });
};

const setMobile = (state: userState, action: any) => {
    return updateObject(state, {
        mobile: action.mobile
    });
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_USER_INFO:
            return setUserInfo(state, action);
        case actionTypes.FETCH_USER_INFO_FAILED:
            return fetchUserInfoFailed(state, action);
        case actionTypes.ENABLE_LOADING:
            return enableLoading(state, action);
        case actionTypes.DISABLE_LOADING:
            return disableLoading(state, action);
        case actionTypes.SET_MOBILE:
            return setMobile(state, action);
        default:
            return state;
    }
};

export default reducer;
