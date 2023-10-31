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
    setAuthId: (value: number) => void;
    setGraphicData: (value: any, value1: any) => void;

};

const initialState: State = {
    formProgramList: [
        {
            id: 0,
            program: '',
            value: '',
            pointsExpirationDate: null,
            index: 0,
            userAuthId: 0,
            typeOfScore: '',
        }
    ],

    formTransfer: {
        originProgramId: 0,
        destinyProgramId: 0,
        quantity: 0,
        pointsExpirationDate: null,
        originValue: 0,
        destinyValue: 0,
        bonus: 0,
        userAuthId: 0
    },

    graphicData: {
        labels: [],
        data: [],
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
                    value: '',
                    pointsExpirationDate: null,
                    userAuthId: authId,
                    typeOfScore: '',
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
            console.log('updatedFormList', updatedFormList)
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

    setGraphicData: (labels: [], data: []) => {
        set((state) => ({
            graphicData: { labels: labels, data: data },
        }));
    },
}));

export default usePointFormStore;