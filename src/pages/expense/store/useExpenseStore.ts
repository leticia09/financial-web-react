import {create} from "zustand";
import {IGraphic} from "../../../interfaces/points-program";
import {IExpense} from "../../../interfaces/expense";

type State = {
    formList: IExpense[];
    form: IExpense;
    graphicData: IGraphic;
};

type Actions = {
    setGraphicData: (value: any, value1: any, value2: any, value3: any, value4: any, value5: any,) => void;
    setFormList: (formList: IExpense[]) => void;
    setFormListValue: (index: number, field: keyof IExpense, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => any;
    resetFormStore: () => void;
    resetForm: () => void;
    setOwnerId: (ownerId: number) => void;
    setUserAuthId: (userAuthId: number) => void;
    setLocal: (local: string) => void;
    setMacroGroup: (macroGroup: string) => void;
    setSpecificGroup: (specificGroup: string) => void;
    setPaymentForm: (paymentForm: string) => void;
    setFinalCard: (cardId: number) => void;
    setQuantityPart: (quantityPart: number) => void;
    setHasFixed: (hasFixed: boolean) => void;
    setDateBuy: (dateBuy: string) => void;
    setObs: (obs: string) => void;
    setValue: (value: number) => void;
    setHasSplitExpense: (hasSplitExpense: boolean) => void;
    setFrequency: (frequency: string) => void;
    setInitialDate: (initialDate: string) => void;
    setMonthReceive: (monthReceive: number) => void;
    setDayReceive: (dayReceive: number) => void;
    setCardId: (dayReceive: number) => void;
    setMoney: (moneyId: number) => void;
    setTicket: (ticketId: number) => void;

    setBankId: (bankId: number) => void;
    setAccountId: (accountId: number) => void;

};

const initialState: State = {
    formList: [],
    form:
        {
            id: null,
            local: '',
            macroGroup: '',
            specificGroup: '',
            ownerId: 0,
            paymentForm: '',
            finalCard: 0,
            quantityPart: 0,
            hasFixed: false,
            dateBuy: null,
            obs: '',
            value: 0,
            userAuthId: 0,
            index: 0,
            hasSplitExpense: false,
            frequency: '',
            initialDate: null,
            monthPayment: 0,
            dayPayment: 0,
            ticketId: null,
            cardId: null,
            moneyId: null,
            bankId: null,
            accountId: null
        },

    graphicData: {
        dataSet: [],
        labels: [],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
    },

};

const useExpenseStore = create<State & Actions>((set) => {
    return ({
        ...initialState,
        setGraphicData: (labels: [], dataSet: [], total1: number, total2: number, total3: number, total4: number) => {
            set((state) => ({
                graphicData: {
                    labels: labels,
                    dataSet: dataSet,
                    total1: total1,
                    total2: total2,
                    total3: total3,
                    total4: total4
                },
            }));
        },
        setFormList: (formList: IExpense[]) => {
            set({formList: formList});
        },


        setFormListValue: (index: number, field: keyof IExpense, value: string, authId?: number) => {
            set((state) => {
                const updatedFormList = [...state.formList];

                if (!updatedFormList[index]) {
                    updatedFormList[index] = {
                        id: null,
                        local: '',
                        macroGroup: '',
                        specificGroup: '',
                        ownerId: 0,
                        paymentForm: '',
                        finalCard: 0,
                        quantityPart: 0,
                        hasFixed: false,
                        dateBuy: '',
                        obs: '',
                        value: 0,
                        userAuthId: 0,
                        index: 0,
                        hasSplitExpense: false,
                        frequency: '',
                        initialDate: null,
                        monthPayment: 0,
                        dayPayment: 0,
                        ticketId: null,
                        cardId: null,
                        moneyId: null,
                        bankId: null,
                        accountId: null
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
        setOwnerId: (ownerId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    ownerId: ownerId,
                },
            }));
        },

        setUserAuthId: (userAuthId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    userAuthId: userAuthId,
                },
            }));
        },

        setLocal: (local: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    local: local,
                },
            }));
        },

        setMacroGroup: (macroGroup: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    macroGroup: macroGroup,
                },
            }));
        },
        setSpecificGroup: (specificGroup: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    specificGroup: specificGroup,
                },
            }));
        },
        setPaymentForm: (paymentForm: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    paymentForm: paymentForm,
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
        setQuantityPart: (quantityPart: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    quantityPart: quantityPart,
                },
            }));
        },
        setHasFixed: (hasFixed: boolean) => {
            set((state) => ({
                form: {
                    ...state.form,
                    hasFixed: hasFixed,
                },
            }));
        },
        setDateBuy: (dateBuy: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    dateBuy: dateBuy,
                },
            }));
        },
        setObs: (obs: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    obs: obs,
                },
            }));
        },
        setValue: (value: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    value: value,
                },
            }));
        },

        setHasSplitExpense: (hasSplitExpense: boolean) => {
            set((state) => ({
                form: {
                    ...state.form,
                    hasSplitExpense: hasSplitExpense,
                },
            }));
        },
        setFrequency: (frequency: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    frequency: frequency,
                },
            }));
        },

        setDayReceive: (dayPayment: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    dayPayment: dayPayment,
                },
            }));
        },

        setMonthReceive: (monthPayment: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    monthPayment: monthPayment,
                },
            }));
        },

        setInitialDate: (initialDate: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    initialDate: initialDate,
                },
            }));
        },

        setCardId: (cardId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    cardId: cardId,
                },
            }));
        },

        setTicket: (ticketId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    ticketId: ticketId,
                },
            }));
        },

        setMoney: (moneyId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    moneyId: moneyId,
                },
            }));

        },

        setBankId: (bankId: number) =>  {
            set((state) => ({
                form: {
                    ...state.form,
                    bankId: bankId,
                },
            }));

        },
        setAccountId: (accountId: number) =>  {
            set((state) => ({
                form: {
                    ...state.form,
                    accountId: accountId,
                },
            }));

        },

        resetFormStore: () => {
            set(initialState);
        },

        resetForm: () => {

            set((state) => ({
                form: {
                    ...state.form,
                    local: '',
                    macroGroup: '',
                    specificGroup: '',
                    ownerId: 0,
                    paymentForm: '',
                    finalCard: 0,
                    quantityPart: 0,
                    hasFixed: false,
                    dateBuy: null,
                    obs: '',
                    value: 0,
                    userAuthId: 0,
                    index: 0,
                    hasSplitExpense: false,
                    frequency: '',
                    initialDate: null,
                    monthReceive: 0,
                    dayReceive: 0,
                    ticketId: null,
                    cardId: null,
                    moneyId: null,
                },
            }));
        },
    });
});

export default useExpenseStore;