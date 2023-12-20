import {create} from "zustand";
import {IMoney} from "../../../interfaces/money";


type State = {
    formList: IMoney[];
};

type Actions = {
    setFormList: (formList: IMoney[]) => void,
    setFormListValue: (index: number, field: keyof IMoney, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
};

const initialState: State = {
    formList: [
        {
            id: null,
            index: 0,
            userAuthId: 0,
            currency: '',
            value: '',
            ownerId: 0
        }
    ],
};

const useMoneyStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormList: (formList: IMoney[]) => {
        set({formList: formList})
    },

    setFormListValue: (index: number, field: keyof IMoney, value: string, authId?: number) => {
        set((state) => {
            const updatedFormList = [...state.formList];

            if (!updatedFormList[index]) {
                updatedFormList[index] = {
                    id: null,
                    index: 0,
                    userAuthId: 0,
                    currency: '',
                    value: '',
                    ownerId: 0,
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
        set({
            formList: [
                {
                    id: null,
                    index: 0,
                    userAuthId: 0,
                    currency: '',
                    value: '',
                    ownerId: 0
                }
            ]
        })
    },
}));

export default useMoneyStore;