import {create} from "zustand";
import {IProgram} from "../../../../interfaces/points-program";

type State = {
    formProgramList: IProgram[];
};

type Actions = {
    setPointFormList: (formList: IProgram[]) => void,
    setFormListValue: (index: number, field: keyof IProgram, value: any, authId?: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
};

const initialState: State = {
    formProgramList: [
        {
            id: 0,
            program: '',
            value: '',
            pointsExpirationDate: null,
            index: 0,
            userAuthId: 0
        }
    ],
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
                    userAuthId: authId
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
            return { formProgramList: updatedFormList };
        });
    },
    resetFormStore: () => {
        set(initialState);
    },
}));

export default usePointFormStore;