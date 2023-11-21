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
    total1: number,
    total2: number,
    total3: number,
    total4: number,
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