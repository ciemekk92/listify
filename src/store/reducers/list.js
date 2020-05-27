import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    date: null,
    currentList: null,
    selectedItem: {
        id: null,
        value: '',
        date: null,
        completed: false
    }
};

const setSelectedDate = (state, action) => {
    return updateObject(state, {
        date: action.date
    });
};

const setCurrentList = (state, action) => {
    return updateObject(state, {
        currentList: action.currentList
    });
};

const setSelectedItem = (state, action) => {
    return updateObject(state, {
        selectedItem: action.selectedItem
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DATE:
            return setSelectedDate(state, action);
        case actionTypes.SET_CURRENT_LIST:
            return setCurrentList(state, action);
        case actionTypes.SET_SELECTED_ITEM:
            return setSelectedItem(state, action);
        default:
            return state;
    }
};

export default reducer;
