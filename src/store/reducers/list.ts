import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { listState, ListActionTypes} from '../types/types';

const initialState: listState = {
    date: null,
    currentList: null,
    selectedItem: {
        id: null,
        value: '',
        date: null,
        completed: false,
        description: ''
    },
    changedDate: null
};

const setSelectedDate = (state: listState, action: any) => {
    return updateObject(state, {
        date: action.date
    });
};

const setCurrentList = (state: listState, action: any) => {
    return updateObject(state, {
        currentList: action.currentList
    });
};

const setSelectedItemEmpty = (state: listState, action: any) => {
    return updateObject(state, {
        selectedItem: {
            id: null,
            value: '',
            date: null,
            completed: false,
            description: ''
        }
    });
};

const setSelectedItem = (state: listState, action: any) => {
    return updateObject(state, {
        selectedItem: action.selectedItem
    });
};

const setChangedDate = (state: listState, action: any) => {
    return updateObject(state, {
        changedDate: action.changedDate
    });
};

const reducer = (state = initialState, action: ListActionTypes) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DATE:
            return setSelectedDate(state, action);
        case actionTypes.SET_CURRENT_LIST:
            return setCurrentList(state, action);
        case actionTypes.SET_SELECTED_ITEM:
            return setSelectedItem(state, action);
        case actionTypes.SET_CHANGED_DATE:
            return setChangedDate(state, action);
        case actionTypes.SET_SELECTED_ITEM_EMPTY:
            return setSelectedItemEmpty(state, action);
        default:
            return state;
    }
};

export default reducer;
