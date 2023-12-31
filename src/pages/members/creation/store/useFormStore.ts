import {create} from "zustand";
import {IMember} from "../../../../interfaces/member";

type State = {
    formList: IMember[];
};

type Actions = {
    setFormList: (formList: IMember[]) => void,
    setFormListValue: (index: number, field: keyof IMember, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
};

const initialState: State = {
    formList: [
        {
            id: null,
            index: 0,
            name: "",
            userAuthId: 0,
            color: '',
            status: 0,
        }
    ],
};

const useFormStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormList: (formList: IMember[]) => {
        set({formList: formList})
    },

    setFormListValue: (index: number, field: keyof IMember, value: string, authId?: number) => {
        set((state) => {
            const updatedFormList = [...state.formList];

            if (!updatedFormList[index]) {
                updatedFormList[index] = {
                    id: null,
                    index: 0,
                    name: "",
                    userAuthId: 0,
                    color: '',
                    status: 0,
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
                    name: "",
                    userAuthId: 0,
                    color: '',
                    status: 0,
                }
            ]
        })
    },
}));

export default useFormStore;