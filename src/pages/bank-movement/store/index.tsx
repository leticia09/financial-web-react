import {create} from "zustand";
import {IGraphic} from "../../../interfaces/points-program";

type State = {

    graphicData: IGraphic;
};

type Actions = {
    setGraphicData: (value: any, value1: any, value2: any, value3: any, value4: any, value5: any,) => void;

};

const initialState: State = {

    graphicData: {
        dataSet: [],
        labels: [],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
    }
};

const movementBankStore = create<State & Actions>((set) => ({
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
        }
        ,
    }))
;

export default movementBankStore;