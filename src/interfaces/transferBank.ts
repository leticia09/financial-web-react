export interface ITransferBank {
    id?: number;
    userAuthId?: number;
    index?: number;
    bankOriginId: number
    bankDestinyId: number;
    ownerOriginId: number;
    ownerDestinyId: number;
    accountOriginId: number;
    accountDestinyId: number;
    receiver: string;
    value: string;
    dateTransfer: string;
    obs: string;
}