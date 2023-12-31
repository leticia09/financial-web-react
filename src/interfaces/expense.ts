export interface IExpense {
    id?: number;
    local: string;
    macroGroup: string;
    specificGroup?: string;
    ownerId: number;
    paymentForm: string;
    finalCard?: number;
    quantityPart?: number;
    hasFixed: boolean;
    dateBuy: string;
    obs?: string;
    value: number;
    userAuthId: number;
    index: number;

    hasSplitExpense: boolean;
    frequency: string;
    initialDate: string;
    monthPayment: number;
    dayPayment: number;

    moneyId?: number,
    ticketId?: number;
    cardId?: number

    bankId?: number;
    accountId?: number;
}

export interface IPayment {
    id?: number;
    expenseId: number;
    paymentDate: string;
    referencePeriod: string;
    value: string;
    ownerId: number;
    obs: string;
}