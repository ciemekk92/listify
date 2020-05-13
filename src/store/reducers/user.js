import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userInfo: {
        uid: '',
        createdAt: {},
        email: '',
        userName: '',
        listItems: []
    },
    error: null,
    loaded: false,
    loading: true
};

const setUserInfo = (state, action) => {
    return updateObject(state, {
        userInfo: action.userInfo
    });
};

const fetchUserInfoFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const enableLoading = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const disableLoading = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_INFO:
            return setUserInfo(state, action);
        case actionTypes.FETCH_USER_INFO_FAILED:
            return fetchUserInfoFailed(state, action);
        case actionTypes.ENABLE_LOADING:
            return enableLoading(state, action);
        case actionTypes.DISABLE_LOADING:
            return disableLoading(state, action);
        default:
            return state;
    }
};

export default reducer;
