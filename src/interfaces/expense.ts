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
}