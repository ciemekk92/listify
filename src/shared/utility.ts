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

export const alertError = (error: any) => {
    alert(
        'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
            error
    );
};
