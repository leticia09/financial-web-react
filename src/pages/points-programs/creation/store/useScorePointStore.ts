import {create} from "zustand";
import {IProgram} from "../../../../interfaces/points-program";

type State = {
    formList: IProgram[];
};

type Actions = {
    setFormList: (formList: IProgram[]) => void,
    setFormListValue: (index: number, field: keyof IProgram, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
};

const initialState: State = {
    formList: [
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
};

const useScorePointStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormList: (formList: IProgram[]) => {
        set({formList: formList})
    },

    setFormListValue: (index: number, field: keyof IProgram, value: string, authId?: number) => {
        set((state) => {
            const updatedFormList = [...state.formList];

            if (!updatedFormList[index]) {
                updatedFormList[index] = {
                    id: null,
                    program: '',
                    value: 0,
                    pointsExpirationDate: null,
                    index: 0,
                    userAuthId: authId,
                    typeOfScore: '',
                    ownerId: 0
                };
            }

            // @ts-ignore
            updatedFormList[index][field] = value;

            return {formList: updatedFormList};
        });
    },
    deleteItemFormList: (index: number) => {
        set((state) => {
            const updatedFormList = [...state.formList];
            if (index >= 0 && index < updatedFormList.length) {
                updatedFormList.splice(index, 1);
            }
            return {formList: updatedFormList};
        });
    },
    resetFormStore: () => {
        set(initialState);
    },
}));

export default useScorePointStore;