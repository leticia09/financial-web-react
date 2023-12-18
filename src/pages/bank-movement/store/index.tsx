import {create} from "zustand";
import {IGraphic} from "../../../interfaces/points-program";
import {IReceive} from "../../../interfaces/entrance";

type State = {
    graphicData: IGraphic;
    formList: IReceive[];
    form: IReceive;
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
    }))
;

export default movementBankStore;