import * as actionTypes from './actionTypes';
import { getUserDoc } from '../../firebase/firebase';

export const setUserInfo = (userInfo) => {
    return {
        type: actionTypes.SET_USER_INFO,
        userInfo: userInfo
    };
};

export const fetchUserInfoFailed = (error) => {
    return {
        type: actionTypes.FETCH_USER_INFO_FAILED,
        error: error
    };
};

export const enableLoading = () => {
    return {
        type: actionTypes.ENABLE_LOADING
    };
};

export const disableLoading = () => {
    return {
        type: actionTypes.DISABLE_LOADING
    };
};

export const initUserInfo = () => {
    return (dispatch) => {
        dispatch(enableLoading());
        getUserDoc(localStorage.getItem('currentUser'))
            .then((response) => {
                dispatch(setUserInfo(response));
                dispatch(disableLoading());
            })
            .catch((error) => {
                dispatch(fetchUserInfoFailed(error));
            });
    };
};
