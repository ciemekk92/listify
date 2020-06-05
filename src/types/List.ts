export type List = {
    name: string;
    id: string;
    timestamp: number;
    listItems: {
        completed: {
            value: string;
            id: string;
            date: Date;
            completed: boolean;
        }[];

        notCompleted: {
            value: string;
            id: string;
            date: Date;
            completed: boolean;
        }[];
    };
};
