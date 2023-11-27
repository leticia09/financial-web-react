export interface IEntrance {
    id: number;
    source: string;
    type: string;
    ownerId: number;
    salary: number;
    bankId: number;
    accountNumber: number;
    userAuthId: number;
}

export interface ITypeSalary {
    id?: number;
    description: string;
    deleted: boolean;
    status: string;
    userAuthId: number;

}