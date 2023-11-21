import create from 'zustand';
import {IAccount, IBankData, ICard} from '../../../../interfaces/bankData';

type State = {
    forms: any[];
    formList: IBankData;
    columns: any[];
    rows: any[];
    formType: string;
    currentBankIndex: number
};

type Actions = {
    setForms: (forms: any[]) => void;
    setFormList: (data: IBankData) => void;
    setColumns: (columns: any[]) => void;
    setRows: (rows: any[]) => void;
    addAccount: (account: IAccount) => void;
    resetAccounts: () => void;
    setBankNameFormList: (bankName: string) => void;
    addCard: (card: ICard, index: number) => void;
    setFormType: (type: string) => void;
    setCurrentBankIndex: (index: number) => void;
};

const initialState: State = {
    formList: {} as IBankData,
    columns: [
        {label: "Cartão"},
        {label: "Responsável"},
        {label: "Final"},
        {label: "Modalidade"},
        {label: "Vencimento"},
        {label: "Fatura"},
        {label: "Programa"},
        {label: "Pontuação"},
        {label: "Moeda"}
    ],
    rows: [],
    forms: [],
    formType: "CREATE",
    currentBankIndex: 0
};

const useFormBankStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormList: (data) => set({formList: data}),
    setColumns: (columns) => set({columns}),
    setForms: (forms) => set({forms}),
    setRows: (rows) => set({rows}),
    addAccount: (newAccount) => {
        set((state) => {
            newAccount.label = "Conta: " + newAccount.accountNumber + "/" + newAccount.owner;
            if(!newAccount.cards) {
                newAccount.cards = [];
            }
            const isAccountAlreadyAdded = state.formList.accounts.some(
                (account) => account.accountNumber === newAccount.accountNumber
            );
            if (!isAccountAlreadyAdded) {
                const newAccounts = [...state.formList.accounts, newAccount];
                const updatedFormList = {...state.formList, accounts: newAccounts};
                return {formList: updatedFormList};
            }
            return state;
        });
    },
    resetAccounts: () => {
        set((state) => {
            const updatedFormList = {...state.formList, accounts: []};
            return {formList: updatedFormList};
        });
    },
    setBankNameFormList: (bankName) => {
        set((state) => ({
            formList: {
                ...state.formList,
                name: bankName,
            },
        }));
    },
    addCard: (newCard, index) => {
        set((state) => {
            const updatedAccounts: IAccount[] = state.formList.accounts.slice();
            if (updatedAccounts[index] && updatedAccounts[index].cards) {
                updatedAccounts[index].cards = [...updatedAccounts[index].cards, newCard];
            } else {
                updatedAccounts[index].cards = [newCard];
            }
            const updatedFormList = {...state.formList, accounts: updatedAccounts};
            return {formList: updatedFormList};
        });
    },
    setFormType: (type) => set({formType: type}),
    setCurrentBankIndex: (index) => set({currentBankIndex: index}),

}));


export default useFormBankStore;
