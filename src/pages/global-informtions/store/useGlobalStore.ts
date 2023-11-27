import { IMember } from "../../../interfaces/member";
import create from 'zustand';
import {IBankData} from "../../../interfaces/bankData";

type State = {
    modality: any[];
    members: IMember[] | null;
    bank: IBankData[] | null;
    typeOfScore: any[];
    program: any[];
    status: any[];
    currency: any[];
    typeSalary: any[];
};

type Actions = {
    setModality: (modality: string[]) => void;
    setMember: (member: IMember[] | null) => void;
    setBank: (bank: IBankData[] | null) => void;
    setTypeOfScore: (type: any[]) => void;
    setProgram: (program: any[]) => void;
    setStatus: (program: any[]) => void;
    setTypeSalary: (typeSalary: any[]) => void;
};

const initialState: State = {
    modality: [],
    members: null,
    bank: null,
    typeOfScore: [],
    program: [],
    status: [],
    currency: [{id: 1, description: "Real (R$)"}, {id: 2, description: "Dólar ($)"}],
    typeSalary: []
};

const useGlobalStore = create<State & Actions>((set) => ({
    ...initialState,
    setModality: (modality) => set({ modality }),
    setMember: (member) => set({ members: member }),
    setBank: (bank) => set({ bank: bank }),
    setTypeOfScore: (typeOfScore) => set({ typeOfScore }),
    setProgram: (program) => set({ program }),
    setStatus: (status) => set({ status }),
    setTypeSalary: (typeSalary) => set({ typeSalary }),
}));

export default useGlobalStore;
