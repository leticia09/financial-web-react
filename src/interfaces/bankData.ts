export interface IBankData {
    name: string,
    accounts: IAccount[],
    userAuthId: number
}

export interface IAccount {
    label: string,
    accountNumber: number,
    owner: string,
    cards: ICard[],
    index: number
}

export interface ICard {
    name: string,
    owner: string,
    finalNumber: number,
    modality: string,
    closingDate: number,
    dueDate: number,
    index: number,
    point?: number;
    currencyPoint?: string;
}