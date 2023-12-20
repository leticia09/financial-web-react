import {create} from "zustand";
import {IEntrance, ITypeSalary} from "../../../interfaces/entrance";
import {IGraphic} from "../../../interfaces/points-program";

type State = {
    formList: IEntrance[];
    form: IEntrance;
    typeSalary: ITypeSalary[];
    graphicData: IGraphic;
};

type Actions = {
    setGraphicData: (value: any, value1: any, value2: any, value3: any, value4: any, value5: any,) => void;
    setFormList: (formList: IEntrance[]) => void;
    setFormListValue: (index: number, field: keyof IEntrance, value: string, authId?: number) => void;
    deleteItemFormList: (index: number) => any;
    resetFormStore: () => void;
    setSource: (source: string) => void;
    setType: (type: string) => void;
    setOwnerId: (ownerId: number) => void;
    setSalary: (salary: number) => void;
    setBankId: (bankId: number) => void;
    setAccountNumber: (accountNumber: number) => void;
    setUserAuthId: (userAuthId: number) => void;
    setFrequency: (frequency: string) => void;
    setFinalDate: (finalDate: string) => void;
    setInitialDate: (initialDate: string) => void;
    setMonthReceive: (monthReceive: number) => void;
    setDayReceive: (dayReceive: number) => void;
    setTicket: (ticketId: number) => void;
    setTicketCard: (cardId: number) => void;
    setMoney: (moneyId: number) => void;
    resetForm: () => void;

    setTypeSalary: (index: number, field: keyof ITypeSalary, value: string, authId?: number) => void;
    setTypeSalaryList: (typeSalary: ITypeSalary[]) => void;
    deleteSalaryType: (index: number) => void;
};

const initialState: State = {
    formList: [],
    form:
        {
            source: "",
            type: "",
            ownerId: 0,
            salary: 0,
            bankId: 0,
            accountNumber: 0,
            userAuthId: 0,
            index: 0,
            frequency: '',
            initialDate: null,
            finalDate: null,
            monthReceive: 0,
            dayReceive: 0,
            ticketId: null,
            cardId: null,
            moneyId: null,
        },
    typeSalary: [
        {
            id: null,
            description: "",
            deleted: false,
            userAuthId: 0
        }
    ],
    graphicData: {
        dataSet: [],
        labels: [],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
    },

};

const useEntranceStore = create<State & Actions>((set) => {
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
        setFormList: (formList: IEntrance[]) => {
            set({formList: formList});
        },

        setTypeSalaryList: (typeSalary: ITypeSalary[]) => {
            set({typeSalary: typeSalary});
        },

        setFormListValue: (index: number, field: keyof IEntrance, value: string, authId?: number) => {
            set((state) => {
                const updatedFormList = [...state.formList];

                if (!updatedFormList[index]) {
                    updatedFormList[index] = {
                        source: "",
                        type: "",
                        ownerId: 0,
                        salary: 0,
                        bankId: 0,
                        accountNumber: 0,
                        userAuthId: 0,
                        index: 0,
                        frequency: '',
                        initialDate: null,
                        finalDate: null,
                        monthReceive: 0,
                        dayReceive: 0,
                        ticketId: null,
                        cardId: null,
                        moneyId: null,
                    };
                }

                // @ts-ignore
                updatedFormList[index][field] = value;

                return {formList: updatedFormList};
            });
        },
        setTypeSalary: (index: number, field: keyof ITypeSalary, value: string, authId?: number) => {
            set((state) => {
                const updatedTypeSalary = [...state.typeSalary];

                if (!updatedTypeSalary[index]) {
                    updatedTypeSalary[index] = {
                        id: null,
                        description: "",
                        deleted: false,
                        userAuthId: authId || 0
                    };
                }

                // @ts-ignore
                updatedTypeSalary[index][field] = value;

                return {typeSalary: updatedTypeSalary};
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
        setSource: (source: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    source: source,
                },
            }));
        },
        setType: (type: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    type: type,
                },
            }));
        },
        setOwnerId: (ownerId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    ownerId: ownerId,
                },
            }));
        },
        setSalary: (salary: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    salary: salary,
                },
            }));
        },
        setBankId: (bankId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    bankId: bankId,
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

        setDayReceive: (dayReceive: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    dayReceive: dayReceive,
                },
            }));
        },

        setMonthReceive: (monthReceive: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    monthReceive: monthReceive,
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

        setFinalDate: (finalDate: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    finalDate: finalDate,
                },
            }));
        },

        setAccountNumber: (accountNumber: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    accountNumber: accountNumber,
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

        setTicket: (ticketId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    ticketId: ticketId,
                },
            }));
        },

        setTicketCard: (cardId: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    cardId: cardId,
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

        deleteSalaryType: (index: number) => {
            set((state) => {
                const updatedFormList = [...state.typeSalary];
                if (index >= 0 && index < updatedFormList.length) {
                    updatedFormList.splice(index, 1);
                }
                return {typeSalary: updatedFormList};
            });
        },

        resetFormStore: () => {
            set(initialState);
        },

        resetForm: () => {

            set((state) => ({
                form: {
                    ...state.form,
                    source: "",
                    type: "",
                    salary: 0,
                    ownerId: 0,
                    bankId: 0,
                    accountNumber: 0,
                    userAuthId: 0,
                    frequency: "",
                    initialDate: null,
                    finalDate: null,
                    monthReceive: 0,
                    dayReceive: 0,
                    ticketId: 0,
                    cardId: 0,
                    moneyId: 0,
                },
            }));
        },
    });
});

export default useEntranceStore;