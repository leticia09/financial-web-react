import {create} from "zustand";
import {IGraphic, IProgram, ITransfer} from "../../../../interfaces/points-program";

type State = {
    formProgramList: IProgram[];
    formTransfer: ITransfer;
    graphicData: IGraphic;
};

type Actions = {
    setPointFormList: (formList: IProgram[]) => void,
    setFormListValue: (index: number, field: keyof IProgram, value: any, authId?: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
    setFormTransfer: (value: ITransfer) => void;
    setOriginProgramId: (value: number) => void;
    setDestinyProgramId: (value: number) => void;
    setQuantity: (value: number) => void;
    setPointsExpirationDate: (value: Date) => void;
    setOriginValue: (value: number) => void;
    setDestinyValue: (value: number) => void;
    setBonus: (value: number) => void;
    setOwnerOriginId: (value: number) => void;
    setOwnerDestinyId: (value: number) => void;
    setAuthId: (value: number) => void;
    setGraphicData: (value: any, value1: any, value2: any, value3: any, value4: any, value5: any,) => void;

};

const initialState: State = {
    formProgramList: [
        {
            id: 0,
            program: '',
            value: 0,
            pointsExpirationDate: null,
            index: 0,
            userAuthId: 0,
            typeOfScore: '',
            ownerId: 0
        }
    ],

    formTransfer: {
        originProgramId: 0,
        destinyProgramId: 0,
        quantity: null,
        pointsExpirationDate: null,
        originValue: 0,
        destinyValue: 0,
        bonus: 0,
        userAuthId: 0,
        ownerIdOrigin: 0,
        ownerIdDestiny: 0,
    },

    graphicData: {
        dataSet: [],
        labels: [],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
    }
};

const usePointFormStore = create<State & Actions>((set) => ({
        ...initialState,
        setPointFormList: (formProgramList: IProgram[]) => {
            set({formProgramList: formProgramList})
        },
        setFormListValue: (index: number, field: keyof IProgram, value: any, authId?: number) => {
            set((state) => {
                const updatedFormList = [...state.formProgramList];

                if (!updatedFormList[index]) {
                    updatedFormList[index] = {
                        id: null,
                        index: 0,
                        program: "",
                        value: 0,
                        pointsExpirationDate: null,
                        userAuthId: authId,
                        typeOfScore: '',
                        ownerId: 0
                    };
                }

                // @ts-ignore
                updatedFormList[index][field] = value;
                return {formProgramList: updatedFormList};
            });
        },
        deleteItemFormList: (index: number) => {
            set((state) => {
                const updatedFormList = [...state.formProgramList];
                if (index >= 0 && index < updatedFormList.length) {
                    updatedFormList.splice(index, 1);
                }
                return {formProgramList: updatedFormList};
            });
        },
        setOriginProgramId: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, originProgramId: value},
            }));
        },
    setOwnerOriginId: (value: number) => {
        set((state) => ({
            formTransfer: {...state.formTransfer, ownerIdOrigin: value},
        }));
    },
    setOwnerDestinyId: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, ownerIdDestiny: value},
            }));
        },
        setDestinyProgramId: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, destinyProgramId: value},
            }));
        },
        setQuantity: (value: number) => {
            set((state) => ({

                formTransfer: {...state.formTransfer, quantity: value},
            }));
        },
        setOriginValue: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, originValue: value},
            }));
        },
        setDestinyValue: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, destinyValue: value},
            }));
        },
        setBonus: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, bonus: value},
            }));
        },
        setAuthId: (value: number) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, userAuthId: value},
            }));
        },
        setPointsExpirationDate: (value: Date) => {
            set((state) => ({
                formTransfer: {...state.formTransfer, pointsExpirationDate: value},
            }));
        },
        resetFormStore: () => {
            set(initialState);
        },
        setFormTransfer: (transfer) => {
            set({formTransfer: transfer});
        },

    setGraphicData: (labels: [], dataSet: [], total1: number, total2: number, total3: number, total4: number) => {
        set((state) => ({
            graphicData: {
                labels: labels,
                dataSet: dataSet,
                total1: total1,
                total2: total2,
                total3: total3,
                total4: total4
            },
        }));
    },
    }))
;

export default usePointFormStore;