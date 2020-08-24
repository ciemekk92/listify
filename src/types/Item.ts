export type Item = {
    value: string;
    id: string;
    date: Date;
    completed: boolean;
    notes: string[];
    list: string;
    tag: {
        name: string;
        color: string;
        id: string;
    };
};
