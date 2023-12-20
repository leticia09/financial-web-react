export interface IEntrance {
    id?: number;
    source: string;
    type: string;
    ownerId: number;
    salary: number;
    bankId?: number;
    accountNumber?: number;
    userAuthId: number;
    index: number;
    frequency: string;
    initialDate: string;
    finalDate?: string;
    monthReceive: number;
    dayReceive: number;
    ticketId?: number;
    cardId?: number;
    moneyId?: number
}

export interface ITypeSalary {
    id?: number;
    description: string;
    deleted: boolean;
    userAuthId: number;

}

export interface IReceive {
    entrance: string;
    salary: string;
    receiveDate: string;
    referencePeriod: string;
    ownerId: number;
    obs: string;
}