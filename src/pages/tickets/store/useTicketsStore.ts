import {create} from "zustand";
import {ITickets} from "../../../interfaces/tickets";


type State = {
    name: string;
    formList: ITickets[];
    form: ITickets;
};

type Actions = {
    setFormList: (formList: ITickets[]) => void,
    setFormListValue: (index: number, field: keyof ITickets, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => any;
    resetFormStore: () => void;
    setName: (index: string) => void;
    setOwner: (ownerId: number) => void;
    setCardName: (cardName: string) => void;
    setFinalCard: (finalCard: number) => void;
    setModality: (modality: string) => void;
    setCurrency: (currency: string) => void;
    setBalance: (balance: string) => void;
    resetForm: () => void;

};

const initialState: State = {
    name: '',
    formList: [
        {
            id: null,
            index: 0,
            userAuthId: 0,
            cardName: '',
            finalCard: null,
            modality: '',
            balance: '',
            ownerId: 0,
            currency: ''
        }
    ],
    form: {
        id: null,
        index: 0,
        userAuthId: 0,
        cardName: '',
        finalCard: 0,
        modality: '',
        balance: '',
        ownerId: 0,
        currency: ''
    }
};

const useTicketsStore = create<State & Actions>((set) => ({
    ...initialState,
    setFormList: (formList: ITickets[]) => {
        set({formList: formList})
    },

    setFormListValue: (index: number, field: keyof ITickets, value: string, authId?: number) => {
        set((state) => {
            const updatedFormList = [...state.formList];

            if (!updatedFormList[index]) {
                updatedFormList[index] = {
                    id: null,
                    index: 0,
                    userAuthId: 0,
                    cardName: '',
                    finalCard: null,
                    modality: '',
                    balance: '',
                    ownerId: 0,
                    currency: ''
                };
            }

            // @ts-ignore
            updatedFormList[index][field] = value;

            return {formList: updatedFormList};
        });
    },
    deleteItemFormList: (index: number) => {
        let updatedFormList = [];
        set((state) => {
            updatedFormList = [...state.formList];
            if (index >= 0 && index < updatedFormList.length) {
                updatedFormList.splice(index, 1);
            }
            return {formList: updatedFormList};
        });
        return updatedFormList;
    },
    resetFormStore: () => {
        set({
            formList: []
        })
    },

    setBalance: (balance: string) => {
        set((state) => ({
            form: {
                ...state.form,
                balance: balance,
            },
        }));
    },
    setCurrency: (currency: string) => {
        set((state) => ({
            form: {
                ...state.form,
                currency: currency,
            },
        }));
    },
    setModality: (modality: string) => {
        set((state) => ({
            form: {
                ...state.form,
                modality: modality,
            },
        }));
    },
    setFinalCard: (finalCard: number) => {
        set((state) => ({
            form: {
                ...state.form,
                finalCard: finalCard,
            },
        }));
    },
    setCardName: (cardName: string) => {
        set((state) => ({
            form: {
                ...state.form,
                cardName: cardName,
            },
        }));
    },
    setOwner: (ownerId: number) => {
        set((state) => ({
            form: {
                ...state.form,
                ownerId: ownerId,
            },
        }));
    },
    setName: (name: string) => {
        set({
            name: name,
        })
    },
    resetForm: () => {

        set((state) => ({
            form: {
                ...state.form,
                index: 0,
                userAuthId: 0,
                cardName: '',
                finalCard: null,
                modality: '',
                balance: '',
                ownerId: 0,
                currency: ''
            },
        }));
    },
}));

export default useTicketsStore;