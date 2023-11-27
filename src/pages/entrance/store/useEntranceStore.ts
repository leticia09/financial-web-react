import {create} from "zustand";
import {IEntrance, ITypeSalary} from "../../../interfaces/entrance";

type State = {
    formList: IEntrance[];
    typeSalary: ITypeSalary[];
};

type Actions = {
    setFormList: (formList: IEntrance[]) => void;
    setFormListValue: (index: number, field: keyof IEntrance, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;

    setTypeSalary: (index: number, field: keyof ITypeSalary, value: string, authId?: number) => void;
};

const initialState: State = {
    formList: [
        {
            id: 0,
            source: "",
            type: "",
            ownerId: 0,
            salary: 0,
            bankId: 0,
            accountNumber: 0,
            userAuthId: 0
        }
    ],
    typeSalary: [
        {
            id: null,
            description: "",
            deleted: false,
            status: "",
            userAuthId: 0
        }
    ]
};

const useEntranceStore = create<State & Actions>((set) => {
    return ({
        ...initialState,
        setFormList: (formList: IEntrance[]) => {
            set({formList: formList})
        },

        setFormListValue: (index: number, field: keyof IEntrance, value: string, authId?: number) => {
            set((state) => {
                const updatedFormList = [...state.formList];

                if (!updatedFormList[index]) {
                    updatedFormList[index] = {
                        id: null,
                        source: "",
                        type: "",
                        ownerId: 0,
                        salary: 0,
                        bankId: 0,
                        accountNumber: 0,
                        userAuthId: authId
                    };
                }

                // @ts-ignore
                updatedFormList[index][field] = value;

                return {formList: updatedFormList};
            });
        },
        setTypeSalary: (index: number, field: keyof ITypeSalary, value: string, authId?: number) => {
            set((state) => {
                const updatedTypeSalary = [...state.typeSalary];

                if (!updatedTypeSalary[index]) {
                    updatedTypeSalary[index] = {
                        id: null,
                        description: "",
                        deleted: false,
                        status: "",
                        userAuthId: authId || 0
                    };
                }

                // @ts-ignore
                updatedTypeSalary[index][field] = value;

                return { typeSalary: updatedTypeSalary };
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
    });
});

export default useEntranceStore;