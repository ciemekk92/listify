import * as actionTypes from './actionTypes';

export const setSelectedDate = (date) => {
    return {
        type: actionTypes.SET_SELECTED_DATE,
        date: date
    };
};
