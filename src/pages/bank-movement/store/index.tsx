import {create} from "zustand";
import {IGraphic} from "../../../interfaces/points-program";
import {IReceive} from "../../../interfaces/entrance";
import {ITransferBank} from "../../../interfaces/transferBank";

type State = {
    graphicData: IGraphic;
    formList: IReceive[];
    form: IReceive;

    formListTransfer: ITransferBank[];
    formTransfer: ITransferBank;
};

type Actions = {
    setGraphicData: (value: any, value1: any, value2: any, value3: any, value4: any, value5: any, value6?: any) => void;
    setFormList: (formList: IReceive[]) => void;
    setEntrance: (entrance: string) => void;
    setSalaryReceive: (salary: string) => void;
    setReceiveDate: (receiveDate: string) => void;
    setReferencePeriod: (referencePeriod: string) => void;
    setOwnerId: (ownerId: number) => void;
    setObs: (obs: string) => void;
    deleteItemFormList: (index: number) => any;
    resetFormStore: () => void;

    setUserAuthIdTransfer: (userAuthId: number) => any;
    setBankOriginId: (bankOriginId: number) => any;
    setBankDestinyId: (bankDestinyId: number) => any;
    setOwnerOriginId: (ownerOriginId: number) => any;
    setOwnerDestinyId: (ownerDestinyId: number) => any;
    setAccountOriginId: (accountOriginId: number) => any;
    setAccountDestinyId: (accountDestinyId: number) => any;
    setReceiver: (receiver: string) => void;
    setValue: (value: string) => void;
    setDateTransfer: (dateTransfer: string) => void;
    setObsTransfer: (obs: string) => void;
    deleteItemFormListTransfer: (obs: number) => any;
    resetFormStoreTransfer: () => void;
    setFormListTransfer: (formListTransfer: ITransferBank[]) => void;
};

const initialState: State = {

    graphicData: {
        dataSet: [],
        labels: [],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
        tooltipLabel: []
    },

    formList: [],
    form:
        {
            entrance: "",
            salary: "",
            receiveDate: null,
            referencePeriod: "",
            ownerId: 0,
            obs: ""
        },
    formListTransfer: [],
    formTransfer: {
        id: null,
        userAuthId: 0,
        index: 0,
        bankOriginId: 0,
        bankDestinyId: 0,
        ownerOriginId: 0,
        ownerDestinyId: 0,
        accountOriginId: 0,
        accountDestinyId: 0,
        receiver: "",
        value: "",
        dateTransfer: null,
        obs: ""
    }
};

const movementBankStore = create<State & Actions>((set) => ({
        ...initialState,

        setGraphicData: (labels: [], dataSet: [], total1: number, total2: number, total3: number, total4: number, tooltipLabel?: []) => {
            set((state) => ({
                graphicData: {
                    labels: labels,
                    dataSet: dataSet,
                    total1: total1,
                    total2: total2,
                    total3: total3,
                    total4: total4,
                    tooltipLabel: tooltipLabel
                },
            }));
        },
        setFormList: (formList: IReceive[]) => {
            set({formList: formList});
        },

        setFormListTransfer: (formListTransfer: ITransferBank[]) => {
            set({formListTransfer: formListTransfer});
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
        deleteItemFormListTransfer: (index: number) => {
            let updatedFormList = [];
            set((state) => {
                updatedFormList = [...state.formListTransfer];
                if (index >= 0 && index < updatedFormList.length) {
                    updatedFormList.splice(index, 1);
                }
                return {formListTransfer: updatedFormList};
            });
            return updatedFormList;
        },
        setEntrance: (entrance: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    entrance: entrance,
                },
            }));
        },
        setSalaryReceive: (salary: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    salary: salary,
                },
            }));
        },
        setReceiveDate: (receiveDate: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    receiveDate: receiveDate,
                },
            }));
        },
        setReferencePeriod: (referencePeriod: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    referencePeriod: referencePeriod,
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
        setObs: (obs: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    obs: obs,
                },
            }));
        },
        setUserAuthIdTransfer: (userAuthId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    userAuthId: userAuthId,
                },
            }));
        },
        setBankOriginId: (bankOriginId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    bankOriginId: bankOriginId,
                },
            }));
        },
        setBankDestinyId: (bankDestinyId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    bankDestinyId: bankDestinyId,
                },
            }));
        },
        setOwnerOriginId: (ownerOriginId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    ownerOriginId: ownerOriginId,
                },
            }));
        },
        setOwnerDestinyId: (ownerDestinyId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    ownerDestinyId: ownerDestinyId,
                },
            }));
        },
        setAccountOriginId: (accountOriginId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    accountOriginId: accountOriginId,
                },
            }));
        },
        setAccountDestinyId: (accountDestinyId: number) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    accountDestinyId: accountDestinyId,
                },
            }));
        },
        setReceiver: (receiver: string) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    receiver: receiver,
                },
            }));
        },
        setValue: (value: string) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    value: value,
                },
            }));
        },
        setDateTransfer: (dateTransfer: string) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    dateTransfer: dateTransfer,
                },
            }));
        },
        setObsTransfer: (obs: string) => {
            set((state) => ({
                formTransfer: {
                    ...state.formTransfer,
                    obs: obs,
                },
            }));
        },
        resetFormStore: () => {
            set((state) => ({
                form: {
                    ...state.form,
                    entrance: "",
                    salary: "",
                    receiveDate: null,
                    ownerId: 0,
                    obs: ""
                },
            }));
        },
        resetFormStoreTransfer: () => {
            set((state) => ({
                formTransfer: {
                    ...state.form,
                    id: null,
                    userAuthId: 0,
                    index: 0,
                    bankOriginId: 0,
                    bankDestinyId: 0,
                    ownerOriginId: 0,
                    ownerDestinyId: 0,
                    accountOriginId: 0,
                    accountDestinyId: 0,
                    receiver: "",
                    value: "",
                    dateTransfer: null,
                    obs: ""
                },
            }));
        }
    }))
;

export default movementBankStore;