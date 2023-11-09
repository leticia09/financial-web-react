import { create } from "zustand";
import { IGroup, ISpecificGroup } from "../../../../interfaces/group";

type State = {
    formList: IGroup;
    formListEdit: any;
};

type Actions = {
    setSpecificList: (formList: ISpecificGroup[]) => void;
    setSpecificListValue: (index: number, field: keyof IGroup, value: string) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
    setGroupMacroName: (value: string) => void;
    setAuthId: (value: number) => void;
    //edit
    setSpecificListEdit: (formList: ISpecificGroup[], indexList: number) => void;
    deleteItemFormListEdit: (index: number, indexList: number) => void;
    setFormListEdit: (formList: any) => void;
    setGroupMacroNameEdit: (value: string, index: number) => void;
    setStatusEdit: (value: string, index: number) => void;
    setSpecificListValueEdit: (index: number, field: keyof any, value: any, indexList: number) => void;

};

const initialState: State = {
    formList: {
        name: "",
        userAuthId: 0,
        specificGroups: [],
    },
    formListEdit: {},
};

const useGroupStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormListEdit: (formListEdit: any) => {
        set((state) => ({
            formListEdit,
        }));
    },
    setSpecificList: (formList: ISpecificGroup[]) => {
        set((state) => ({
            formList: {
                ...state.formList,
                specificGroups: formList,
            },
        }));
    },
    setGroupMacroName: (value: string) => {
        set((state) => ({
            formList: {
                ...state.formList,
                name: value,
            },
        }));
    },

    setAuthId: (value: number) => {
        set((state) => ({
            formList: {
                ...state.formList,
                userAuthId: value,
            },
        }));
    },
    setSpecificListValue: (index: number, field: keyof IGroup, value: string) => {
        set((state) => {
            const specificGroups = [...state.formList.specificGroups];

            if (!specificGroups[index]) {
                specificGroups[index] = {
                    name: "",
                    index: 0,
                    userAuthId: 0
                };
            }

            // @ts-ignore
            specificGroups[index][field] = value;

            return {
                formList: {
                    ...state.formList,
                    specificGroups,
                },
            };
        });
    },
    deleteItemFormList: (index: number) => {
        set((state) => {
            const specificGroups = [...state.formList.specificGroups];
            if (index >= 0 && index < specificGroups.length) {
                specificGroups.splice(index, 1);
            }

            return {
                formList: {
                    ...state.formList,
                    specificGroups,
                },
            };
        });
    },
    deleteItemFormListEdit: (index: number, indexList: number) => {
        set((state) => {
            const formListEdit = { ...state.formListEdit };
            const specificGroups = [...formListEdit[indexList].specificGroups];
                if (index >= 0 && index < specificGroups.length) {
                    specificGroups.splice(index, 1);
                    formListEdit[indexList].specificGroups = specificGroups;
                }
            return {
                formListEdit
            };
        });
    },
    resetFormStore: () => {
        set(initialState);
    },
    setSpecificListEdit: (formList: ISpecificGroup[], indexList: number) => {
        set((state) => {
            const updatedFormListEdit = { ...state.formListEdit };
            if (indexList >= 0) {
                updatedFormListEdit[indexList] = {
                    ...updatedFormListEdit[indexList],
                    specificGroups: formList,
                };
            }
            return {
                formListEdit: updatedFormListEdit,
            };
        });
    },

    setGroupMacroNameEdit: (value: string, index: number) => {
        set((state) => {
            const formListEdit = { ...state.formListEdit };
            formListEdit[index].name = value;
            return { formListEdit };
        });
    },
    setStatusEdit: (value: string, index: number) => {
        set((state) => {
            const formListEdit = { ...state.formListEdit };
            formListEdit[index].status = value;
            return { formListEdit };
        });
    },
    setSpecificListValueEdit: (index: number, field: keyof any, value: any, indexList: number) => {
        set((state) => {
            const formListEdit = { ...state.formListEdit };
            formListEdit[indexList].specificGroups[index][field] = value;
            return { formListEdit };
        });
    },
}));

export default useGroupStore;
