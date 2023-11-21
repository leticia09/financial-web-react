export interface IAccordion {
    label: string;
    Component: JSX.Element[];
    actions: JSX.Element[];
    getValue: (value: any) => void;
    index: number;
    expanded?: boolean;
}

