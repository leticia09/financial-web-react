import {create} from "zustand";
import {IUse} from "../../../../interfaces/points-program";

type State = {
    status: string;
    programId: number;
    userAuthId: number;
    ownerId: number;
    formUse: IUse;
};

type Actions = {
    setStatus: (status: string) => void,
    setProgramId: (programId: number) => void;
    setUserAuthId: (userAuthId: number) => void;
    setFormUse: (formUse: IUse) => void;

    setOwnerId: (ownerId: number) => void;
    setProgram: (programId: number) => void;
    setProgramValue: (value: number) => void;
    resetFormStore: () => void;
};

const initialState: State = {
    status: '',
    programId: 0,
    userAuthId: 0,
    ownerId: 0,
    formUse: {
        programId: 0,
        value: null,
        userAuthId: 0,
        ownerId: 0
    }
};

const useUpdateFormStore = create<State & Actions>((set) => ({
    ...initialState,
    setStatus: (status) => {
        set((state) => ({
            status: status
        }));
    },
    setProgramId: (programId) => {
        set((state) => ({
            programId: programId
        }));
    },
    setOwnerId: (ownerId) => {
        set((state) => ({
            formUse: {...state.formUse, ownerId: ownerId},
        }));
    },
    setUserAuthId: (value) => {
        set((state) => ({
            formUse: {...state.formUse, userAuthId: value},
        }));
    },

    setFormUse: (formUse) => {
        set((state) => ({
            formUse: formUse
        }));
    },

    setProgram: (value: number) => {
        set((state) => ({
            formUse: {...state.formUse, programId: value},
        }));
    },

    setProgramValue: (value: number) => {
        set((state) => ({
            formUse: {...state.formUse, value: value},
        }));
    },

    resetFormStore: () => {
        set(initialState);
    },
}));

export default useUpdateFormStore;