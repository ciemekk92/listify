import { Item, Tag } from '../../types';
import {
    SET_CHANGED_DATE,
    SET_CURRENT_COLOR,
    SET_CURRENT_LIST,
    SET_CURRENT_TAG,
    SET_SELECTED_DATE,
    SET_SELECTED_ITEM,
    SET_SELECTED_ITEM_EMPTY
} from '../actions/actionTypes';

export interface userInfo {
    uid: string;
    createdAt: number;
    email: string;
    userName: string;
    lists: {};
}

export interface listState {
    date: string | null;
    currentList: string | null;
    currentTag: Tag | null;
    currentColor: string;
    selectedItem: {
        id: string | null;
        value: string;
        date: string | null;
        completed: boolean;
        notes: string[];
    };
    changedDate: string | null;
}

export interface userState {
    userInfo: {
        uid: string;
        createdAt: number | null;
        email: string;
        userName: string;
        lists: {};
        tags: {};
    };
    error: any;
    loaded: boolean;
    loading: boolean;
    mobile: boolean;
}

interface setSelectedDateAction {
    type: typeof SET_SELECTED_DATE;
    date: string;
}

interface setCurrentListAction {
    type: typeof SET_CURRENT_LIST;
    currentList: string;
    currentTag: null;
}

interface setCurrentTagAction {
    type: typeof SET_CURRENT_TAG;
    currentList: null;
    currentTag: Tag;
}

interface setCurrentColorAction {
    type: typeof SET_CURRENT_COLOR;
    currentColor: string;
}

interface setSelectedItemEmptyAction {
    type: typeof SET_SELECTED_ITEM_EMPTY;
}

interface setSelectedItemAction {
    type: typeof SET_SELECTED_ITEM;
    selectedItem: Item;
}

interface setChangedDateAction {
    type: typeof SET_CHANGED_DATE;
    selectedDate: string;
}

export type ListActionTypes =
    | setSelectedDateAction
    | setCurrentListAction
    | setSelectedItemEmptyAction
    | setSelectedItemAction
    | setCurrentColorAction
    | setChangedDateAction
    | setCurrentTagAction;
