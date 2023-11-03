export interface IGroup {
    name: string,
    userAuthId: number,
    specificGroups: ISpecificGroup[],
}

export interface ISpecificGroup {
    name: string;
    index: number,
    userAuthId,
}