export interface IProgram {
    id: number;
    program: string;
    value: number;
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
    data: [],
    totalMiles: number,
    totalPoints: number,
    totalProgramActive: number,
    totalProgramInactive: number,
}

export interface IUse {
    programId: number;
    value: number;
    userAuthId: number;
}