export interface IRow {
    id: number;
    name: string;
    status: string;
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