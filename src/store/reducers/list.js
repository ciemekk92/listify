import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    date: null
};

const setSelectedDate = (state, action) => {
    return updateObject(state, {
        date: action.date
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DATE:
            return setSelectedDate(state, action);
        default:
            return state;
    }
};

export default reducer;
