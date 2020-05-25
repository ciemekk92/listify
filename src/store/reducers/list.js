import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    date: null,
    currentList: null,
    hidden: false
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

const setHidden = (state, action) => {
    return updateObject(state, {
        hidden: action.hidden
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DATE:
            return setSelectedDate(state, action);
        case actionTypes.SET_CURRENT_LIST:
            return setCurrentList(state, action);
        case actionTypes.SET_HIDDEN:
            return setHidden(state, action);
        default:
            return state;
    }
};

export default reducer;
