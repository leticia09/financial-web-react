export interface IAccordion {
    label: string;
    Component: JSX.Element[];
    actions: JSX.Element[];
    getValue: (value: any) => void;
    index: number;
    expanded?: boolean;
    status: JSX.Element;
    icon?: JSX.Element;
    info?: JSX.Element;
}

