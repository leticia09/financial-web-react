import {create} from "zustand";
import {IBankData} from "../../../../interfaces/bankData";


type State = {
    formList: IBankData[];
};

type Actions = {
    setFormList: (formList: IBankData[]) => void,
    setFormListValue: (index: number, field: keyof IBankData, value: string, authId: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
};

const initialState: State = {
    formList: [
        {
            name: '',
            accounts: [],
            index: 0,
            userAuthId: 0
        }
    ],
};

const useFormBankStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormList: (formList: IBankData[]) => {
        set({formList: formList})
    },

    setFormListValue: (index: number, field: keyof IBankData, value: string, authId: number) => {
        set((state) => {
            const updatedFormList = [...state.formList];

            if (!updatedFormList[index]) {
                updatedFormList[index] = {
                    name: "",
                    accounts: [],
                    index: 0,
                    userAuthId: authId
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

export default useFormBankStore;