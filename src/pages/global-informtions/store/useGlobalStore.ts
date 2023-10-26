import { IMember } from "../../../interfaces/member";
import create from 'zustand';
import {IBankData} from "../../../interfaces/bankData";

type State = {
    modality: any[];
    members: IMember[] | null;
    bank: IBankData[] | null;
};

type Actions = {
    setModality: (modality: string[]) => void;
    setMember: (member: IMember[] | null) => void;
    setBank: (member: IBankData[] | null) => void;
};

const initialState: State = {
    modality: [],
    members: null,
    bank: null,
};

const useGlobalStore = create<State & Actions>((set) => ({
    ...initialState,
    setModality: (modality) => set({ modality }),
    setMember: (member) => set({ members: member }),
    setBank: (bank) => set({ bank: bank }),
}));

export default useGlobalStore;
