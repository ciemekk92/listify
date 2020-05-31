import * as actionTypes from './actionTypes';

export const setSelectedDate = (date) => {
    return {
        type: actionTypes.SET_SELECTED_DATE,
        date: date
    };
};

export const setCurrentList = (list) => {
    return {
        type: actionTypes.SET_CURRENT_LIST,
        currentList: list
    };
};

export const setSelectedItem = (item) => {
    return {
        type: actionTypes.SET_SELECTED_ITEM,
        selectedItem: item
    };
};
