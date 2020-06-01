export type List = {
    name: string;
    id: string;
    timestamp: number;
    listItems: { value: string; id: string; date: Date; completed: boolean }[];
}