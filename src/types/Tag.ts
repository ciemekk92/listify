import { Item } from './Item';

export type Tag = {
    name: string;
    id: string;
    color: string;
    items: Item[];
};
