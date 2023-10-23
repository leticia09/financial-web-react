import { IMember } from "../../../interfaces/member";
import create from 'zustand';

type State = {
    modality: any[];
    members: IMember[] | null;
};

type Actions = {
    setModality: (modality: string[]) => void;
    setMember: (member: IMember | null) => void;
};

const initialState: State = {
    modality: [],
    members: null,
};

const useGlobalStore = create<State & Actions>((set) => ({
    ...initialState,
    setModality: (modality) => set({ modality }),
    setMember: (member) => set({ members: [member] }),
}));

export default useGlobalStore;
