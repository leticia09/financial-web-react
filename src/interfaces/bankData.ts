export interface IBankData {
    id?: string;
    name: string,
    accounts: IAccount[],
    userAuthId: number
}

export interface IAccount {
    id: number;
    label: string,
    accountNumber: string,
    owner: string,
    cards: ICard[],
    index: number,
    value: number,
    currency: string,
}

export interface ICard {
    id?: number
    name: string,
    owner: string,
    finalNumber: number,
    modality: string,
    closingDate: number,
    dueDate: number,
    index: number,
    program?: string,
    point?: number,
    currency?: string
}