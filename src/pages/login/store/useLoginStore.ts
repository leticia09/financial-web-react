import {create} from "zustand";

type State = {
    auth: boolean;
    user: string;
    sex: string;
    userId: number;
};

type Actions = {
    setAuth: (status: boolean) => void;
    setUser: (name: string) => void;
    setSex: (name: string) => void;
    setUserId: (id: number) => void;
    resetInputStore: () => void;
};

const initialState: State = {
    auth: false,
    user: "",
    sex: "",
    userId: 0,
};

const useLoginStore = create<State & Actions>((set) => ({
    ...initialState,
    setAuth: (auth: boolean) => {
        set({auth: auth});
    },
    setUser: (user: string) => {
        set({user: user});
    },
    setSex: (sex: string) => {
        set({sex: sex});
    },
    setUserId: (userId: number) => {
        set({userId: userId});
    },
    resetInputStore: () => {
        set(initialState);
    },
}));

export default useLoginStore;