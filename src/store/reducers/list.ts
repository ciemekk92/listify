import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { listState, ListActionTypes } from '../types/types';

const initialState: listState = {
    date: null,
    currentList: null,
    currentTag: {
        name: '',
        id: '',
        color: ''
    },
    currentColor: '#2196F3',
    selectedItem: {
        id: null,
        value: '',
        date: null,
        completed: false,
        notes: []
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
        currentList: action.currentList,
        currentTag: initialState.currentTag
    });
};

const setCurrentTag = (state: listState, action: any) => {
    return updateObject(state, {
        currentList: null,
        currentTag: action.currentTag
    });
};

const setCurrentColor = (state: listState, action: any) => {
    return updateObject(state, {
        currentColor: action.currentColor
    });
};

const setSelectedItemEmpty = (state: listState, action: any) => {
    return updateObject(state, {
        selectedItem: {
            id: null,
            value: '',
            date: null,
            completed: false,
            notes: []
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
        case actionTypes.SET_CURRENT_TAG:
            return setCurrentTag(state, action);
        case actionTypes.SET_CURRENT_COLOR:
            return setCurrentColor(state, action);
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
