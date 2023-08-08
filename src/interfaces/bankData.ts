export interface IBankData {
    name: string,
    accounts: IAccount[],
    index: number,
    userAuthId: number
}

export interface IAccount {
    accountNumber: number,
    owner: string,
    cards: ICard[],
    index: number
}

export interface ICard {
    name: string,
    final: number,
    modality: string,
    closingDate: number,
    dueDate: number,
    index: number
}