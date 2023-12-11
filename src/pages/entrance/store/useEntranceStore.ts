import {create} from "zustand";
import {IEntrance, ITypeSalary} from "../../../interfaces/entrance";

type State = {
    formList: IEntrance[];
    form: IEntrance;
    typeSalary: ITypeSalary[];
};

type Actions = {
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
            salary: null,
            bankId: 0,
            accountNumber: 0,
            userAuthId: 0,
            index: 0,
            frequency: '',
            initialDate: null,
            finalDate: null,
            monthReceive: 0,
            dayReceive: 0,
        },
    typeSalary: [
        {
            id: null,
            description: "",
            deleted: false,
            userAuthId: 0
        }
    ]
};

const useEntranceStore = create<State & Actions>((set) => {
    return ({
        ...initialState,

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
                        index: 0,
                        userAuthId: authId,
                        frequency: '',
                        initialDate: null,
                        finalDate: null,
                        monthReceive: 0,
                        dayReceive: 0,
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
                    frequency: ""
                },
            }));
        },
    });
});

export default useEntranceStore;