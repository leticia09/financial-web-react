export interface IProgram {
    id: number;
    program: string;
    value: number;
    pointsExpirationDate: Date;
    index: number;
    userAuthId: number;
    typeOfScore: string;
    ownerId: number;
}

export interface ITransfer {
    originProgramId: number;
    destinyProgramId: number;
    quantity: number;
    pointsExpirationDate: Date;
    originValue: number;
    destinyValue: number;
    bonus: number;
    ownerIdOrigin: number;
    ownerIdDestiny: number;
    userAuthId: number;
}

export interface IGraphic {
    dataSet: IDataSet[],
    labels: [],
    totalMiles: number,
    totalPoints: number,
    totalProgramActive: number,
    totalProgramInactive: number,
}

export interface IDataSet {
    data: [],
    label: string,
    backgroundColor: string,
    borderColor:string,
}


export interface IUse {
    ownerId: number;
    programId: number;
    value: number;
    userAuthId: number;
}