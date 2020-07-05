import { Item } from '../../types';
import {
    SET_CHANGED_DATE,
    SET_CURRENT_LIST,
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
    };
    error: any;
    loaded: boolean;
    loading: boolean;
}

interface setSelectedDateAction {
    type: typeof SET_SELECTED_DATE;
    date: string;
}

interface setCurrentListAction {
    type: typeof SET_CURRENT_LIST;
    currentList: string;
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
    | setChangedDateAction;
