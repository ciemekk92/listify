export type Item = {
    value: string;
    id: string;
    date: Date;
    completed: boolean;
    notes: string[];
    tag?: {
        name: string;
        color: string;
        id: string;
    };
};
