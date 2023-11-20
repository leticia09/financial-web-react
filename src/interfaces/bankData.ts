export interface IBankData {
    name: string,
    accounts: IAccount[],
    userAuthId: number
}

export interface IAccount {
    label: string,
    accountNumber: string,
    owner: string,
    cards: ICard[],
    index: number,
    value: number,
    currency: string,
}

export interface ICard {
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