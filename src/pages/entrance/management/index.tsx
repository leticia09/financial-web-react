import {FunctionComponent, useEffect, useState} from "react";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {DashboardComponent} from "../../../components/dashboard";
import {IColumns} from "../../../interfaces/table";
import useLoginStore from "../../login/store/useLoginStore";
import movementBankStore from "../../bank-movement/store";
import * as AiIcons from "react-icons/ai";
import {EntranceService} from "../service";
import {format, parseISO} from "date-fns";
import {DropdownSingleSelect} from "../../../components/dropdown";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";

const columns: IColumns[] = [
    {
        id: "source",
        label: "Fonte",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "type",
        label: "Tipo",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "ownerId",
        label: "Titular",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "bankId",
        label: "Banco",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "accountNumber",
        label: "Conta",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "salary",
        label: "Salário Líquido",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "frequency",
        label: "Periodicidade",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "frequency",
        label: "Periodicidade",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "initialDate",
        label: "Data Inicial",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "finalDate",
        label: "Data Final",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dayReceive",
        label: "Dia de Receber",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "mouthReceive",
        label: "Mês de Receber",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "actions",
        label: "Ações",
        minWidth: 70,
        width: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];
type RowType = {
    source: string;
    type: string;
    ownerId: number;
    salary: number;
    bankId: number;
    accountNumber: number;
    actions: React.ReactNode[];
    index: number;
};
function createData(source, type, ownerId, bankId, accountNumber, salary, frequency, initialDate, finalDate, monthReceive, dayReceive, actions, index) {
     return {
        source,
        type,
        ownerId,
        bankId,
        accountNumber: accountNumber.toString(),
        salary: salary.toString(),
        frequency,
        initialDate: format(parseISO(initialDate), 'dd/MM/yyyy'),
        finalDate: finalDate ? format(parseISO(finalDate), 'dd/MM/yyyy') : null ,
        monthReceive: monthReceive ? monthReceive.toString() : null,
        dayReceive: dayReceive ? dayReceive.toString() : null,
        actions,
        index
    };
}
export const EntranceData: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loginStore = useLoginStore();
    const store = movementBankStore();
    const service = EntranceService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [cards, setCards] = useState([]);
    const globalStore = useGlobalStore();
    const [filterDay, setSetFilterDay] = useState([]);
    const [filterMonth, setSetFilterMonth] = useState([]);
    const actions = (index) => (
        <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => console.log(index)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => console.log(index)}/>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getData();
                await getGraphic();

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    const getData = async () => {
        const response = await service.list(loginStore.userId);
        const transformedRows = response.data.data.map((data: any, index: number) => createData(
            data.source,
            data.type,
            data.owner.name,
            data.bankId,
            data.accountNumber,
            data.salary,
            data.frequency,
            data.initialDate,
            data.finalDate,
            data.monthReceive,
            data.dayReceive,
            actions(index),
            index
        ));
        setRows(transformedRows);

    }
    const getGraphic = async () => {
        const data = await service.getData(loginStore.userId);
        store.setGraphicData(
            data.data.data.labels,
            data.data.data.dataSet,
            data.data.data.total1,
            data.data.data.total2,
            data.data.data.total3,
            data.data.data.total4
        );

        let card = {
            label: Messages.titles.receivedYear,
            value: "R$ " + data.data.data.total1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card1 = {
            label: Messages.titles.receivedMonth,
            value: "R$ " + data.data.data.total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card2 = {
            label: Messages.titles.quantityOk,
            value: "R$ " + data.data.data.total3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card3 = {
            label: Messages.titles.quantityNotOk,
            value: "U$ " + data.data.data.total4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let cards = [];
        cards.push(card);
        cards.push(card1);
        cards.push(card2);
        cards.push(card3)

        setCards(cards);
    }
    return (
        <>
            <DashboardComponent
                title={Messages.titles.entrance}
                titleButton={Messages.titles.add}
                path="/receitas/cadastro"
                rows={rows}
                arrayHeader={columns}
                dataSets={store.graphicData.dataSet}
                labelsData={store.graphicData.labels}
                optionText={Messages.titles.pointsAndMiles}
                cards={cards}
                showLineProgress={isLoading}
                filters={
                    <div className="register-member">
                        <DropdownSingleSelect
                            label={Messages.titles.year}
                            data={globalStore.monthOfYear}
                            disabled={false}
                            width={"100px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => console.log(value)}
                            value={filterMonth}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.month}
                            data={globalStore.monthOfYear}
                            disabled={false}
                            width={"130px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => console.log(value)}
                            value={filterMonth}
                        />
                    </div>
                }
            />

        </>
    );
}