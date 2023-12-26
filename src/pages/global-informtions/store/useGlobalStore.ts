import { IMember } from "../../../interfaces/member";
import create from 'zustand';
import {IBankData} from "../../../interfaces/bankData";

type State = {
    modality: any[];
    members: IMember[] | null;
    bank: IBankData[];
    typeOfScore: any[];
    program: any[];
    status: any[];
    currency: any[];
    typeSalary: any[];
    days: any [];
    frequency: any[];
    monthOfYear: any[];
    entrance: any[];
    paymentForm: any[];
    macroGroup: any[];
    expense: any[];
    tickets: any[];
    receiveForm: any[];
    money: any[];
    receiveTypes: any[];
};

type Actions = {
    setModality: (modality: string[]) => void;
    setMember: (member: IMember[] | null) => void;
    setBank: (bank: IBankData[] | null) => void;
    setTypeOfScore: (type: any[]) => void;
    setProgram: (program: any[]) => void;
    setStatus: (program: any[]) => void;
    setTypeSalary: (typeSalary: any[]) => void;
    setEntrance: (entrance: any[]) => void;
    setPaymentForm: (entrance: any[]) => void;
    setMacroGroup: (macroGroup) => void;
    setExpense: (expense) => void;
    setTickets: (tickets) => void;
    setMoney: (money) => void;
};

const initialState: State = {
    modality: [],
    members: null,
    bank: null,
    typeOfScore: [],
    program: [],
    status: [],
    currency: [{id: 1, description: "R$"}, {id: 2, description: "US$"}, {id: 3, description: "€"}],
    typeSalary: [],
    entrance: [],
    macroGroup: [],
    expense: [],
    tickets: [],
    money: [],
    receiveForm: [
        {id: 1, description: "Dinheiro"},
        {id: 2, description: "Conta Bancária"},
        {id: 3, description: "Vale"},
    ],
    frequency: [
        {id: 1, description: "Única"},
        {id: 2, description: "Mensal"},
        {id: 3, description: "Trimestral"},
        {id: 4, description: "Semestral"},
        {id: 5, description: "Anual"},
    ],
    monthOfYear: [
        {id: 1, description: "Janeiro"},
        {id: 2, description: "Fevereiro"},
        {id: 3, description: "Março"},
        {id: 4, description: "Abril"},
        {id: 5, description: "Maio"},
        {id: 6, description: "Junho"},
        {id: 7, description: "Julho"},
        {id: 8, description: "Agosto"},
        {id: 9, description: "Setembro"},
        {id: 10, description: "Outubro"},
        {id: 11, description: "Novembro"},
        {id: 12, description: "Dezembro"},
    ],
    days: [
        {id: 1, description: 1},
        {id: 2, description: 2},
        {id: 3, description: 3},
        {id: 4, description: 4},
        {id: 5, description: 5},
        {id: 6, description: 6},
        {id: 7, description: 7},
        {id: 8, description: 8},
        {id: 9, description: 9},
        {id: 10, description: 10},
        {id: 11, description: 11},
        {id: 12, description: 12},
        {id: 13, description: 13},
        {id: 14, description: 14},
        {id: 15, description: 15},
        {id: 16, description: 16},
        {id: 17, description: 17},
        {id: 18, description: 18},
        {id: 19, description: 19},
        {id: 20, description: 20},
        {id: 21, description: 21},
        {id: 22, description: 22},
        {id: 23, description: 23},
        {id: 24, description: 24},
        {id: 25, description: 25},
        {id: 26, description: 26},
        {id: 27, description: 27},
        {id: 28, description: 28},
        {id: 29, description: 29},
        {id: 30, description: 30},
        {id: 31, description: 31},
    ],
    paymentForm: [
        {id: 1, description: "Dinheiro"},
        {id: 2, description: "Débito"},
        {id: 3, description: "Crédito"},
        {id: 4, description: "Pix"},
        {id: 5, description: "Vale"},
    ],
    receiveTypes: [
        {id: 1, description: "Transferência"},
        {id: 2, description: "Receita"},
    ],
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
    setEntrance: (entrance) => set({ entrance }),
    setPaymentForm: (entrance) => set({ entrance }),
    setMacroGroup: (macroGroup) => set({ macroGroup }),
    setExpense: (expense) => set({ expense }),
    setTickets: (tickets) => set({tickets}),
    setMoney: (money) => set({money}),
}));

export default useGlobalStore;
