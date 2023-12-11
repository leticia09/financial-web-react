export interface IEntrance {
    id?: number;
    source: string;
    type: string;
    ownerId: number;
    salary: number;
    bankId: number;
    accountNumber: number;
    userAuthId: number;
    index: number;
    frequency: string;
    initialDate: string;
    finalDate?: string;
    monthReceive: number;
    dayReceive: number;
}

export interface ITypeSalary {
    id?: number;
    description: string;
    deleted: boolean;
    userAuthId: number;

}