export interface IRow {
    id?: number;
    index?: number;
    name?: string;
    status?: string;
    actions: React.ReactNode[];
}

export interface IColumns {
    id?: string;
    label?: string;
    minWidth?: number;
    width?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: any) => any;
}

export interface ICard {
    label: string,
    value: number
}