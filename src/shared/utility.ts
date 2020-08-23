import { sizeNumber } from '../templates/MediaQueries/MediaQueries';
import { Item } from '../types';

export const updateObject = (oldObject: any, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const scrollToRef = (ref: any) => {
    if (window.innerWidth <= sizeNumber.tablet) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
};

export const selectItemHandler = (
    item: Item,
    baseItem: Item,
    ref: any,
    selectCb: Function,
    emptyCb: Function
) => {
    if (item.id !== baseItem.id) {
        selectCb(item);
        setTimeout(() => {
            scrollToRef(ref);
        }, 10);
    } else {
        emptyCb();
    }
};
