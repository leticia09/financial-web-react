export interface IAccordion {
    label: string;
    Component: JSX.Element[];
    handleView?: (value: any) => void;
    handleEdit?: (value: any) => void;
    handleDelete?: (value: any) => void;
    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
}

