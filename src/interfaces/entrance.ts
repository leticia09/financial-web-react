export interface IEntrance {
    id: number;
    source: string;
    type: string;
    ownerId: number;
    salary: number;
    bankId: number;
    accountNumber: number;
    userAuthId: number;
    index: number;
}

export interface ITypeSalary {
    id?: number;
    description: string;
    deleted: boolean;
    userAuthId: number;

}