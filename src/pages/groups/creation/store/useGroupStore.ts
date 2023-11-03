import { create } from "zustand";
import { IGroup, ISpecificGroup } from "../../../../interfaces/group";

type State = {
    formList: IGroup;
};

type Actions = {
    setSpecificList: (formList: ISpecificGroup[]) => void;
    setSpecificListValue: (index: number, field: keyof IGroup, value: string) => void;
    deleteItemFormList: (index: number) => void;
    resetFormStore: () => void;
    setGroupMacroName: (value: string) => void;
    setAuthId: (value: number) => void;
};

const initialState: State = {
    formList: {
        name: "",
        userAuthId: 0,
        specificGroups: [
            {
                name: "",
                index: 0,
                userAuthId: 0
            },
        ],
    },
};

const useGroupStore = create<State & Actions>((set) => ({
    ...initialState,
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
    resetFormStore: () => {
        set(initialState);
    },
}));

export default useGroupStore;
