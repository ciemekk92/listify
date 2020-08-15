import * as actionTypes from './actionTypes';
import { Item, Tag } from '../../types/';

export const setSelectedDate = (date: string) => {
    return {
        type: actionTypes.SET_SELECTED_DATE,
        date: date
    };
};

export const setChangedDate = (date: string) => {
    return {
        type: actionTypes.SET_CHANGED_DATE,
        changedDate: date
    };
};

export const setCurrentList = (list: string) => {
    return {
        type: actionTypes.SET_CURRENT_LIST,
        currentList: list
    };
};

export const setCurrentTag = (tag: Tag) => {
    return {
        type: actionTypes.SET_CURRENT_TAG,
        currentTag: tag
    };
};

export const setCurrentColor = (color: string) => {
    return {
        type: actionTypes.SET_CURRENT_COLOR,
        currentColor: color
    };
};

export const setSelectedItemEmpty = () => {
    return {
        type: actionTypes.SET_SELECTED_ITEM_EMPTY
    };
};

export const setSelectedItem = (item: Item) => {
    return {
        type: actionTypes.SET_SELECTED_ITEM,
        selectedItem: item
    };
};
