export interface IProgram {
    id: number;
    program: string;
    value: string;
    pointsExpirationDate: Date;
    index: number;
    userAuthId: number;
    typeOfScore: string;
}

export interface ITransfer {
    originProgramId: number;
    destinyProgramId: number;
    quantity: number;
    pointsExpirationDate: Date;
    originValue: number;
    destinyValue: number;
    bonus: number;
    userAuthId: number;
}

export interface IGraphic {
    labels: [],
    data: []
}