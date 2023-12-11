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
import {BulletComponent} from "../../../components/bullet";
import {ButtonComponent} from "../../../components/button";

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
        id: "bankName",
        label: "Banco",
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
        id: "initialDate",
        label: "Início",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "finalDate",
        label: "Fim",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dayReceive",
        label: "Dia ",
        minWidth: 30,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "mouthReceive",
        label: "Mês",
        minWidth: 30,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "status",
        label: "Pagamento",
        minWidth: 30,
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

function createData(source, type, ownerId, bankName, salary, frequency, initialDate, finalDate, monthReceive, dayReceive, status, actions, index) {
    let color = "";
    let border= "";
    if(status === "Aguardando") {
        color = "#ead337";
        border = "0.5px solid #ead337"
    } else if( status === "Confirmado") {
        color = "#46ba52";
        border = "0.5px solid #46ba52"
    } else {
        color = "red";
        border = "0.5px solid red"
    }
    const statusCard =
        <ButtonComponent
            label={status}
            disabled={false}
            width="90px"
            height="22px"
            cursor="pointer"
            borderRadius="4px"
            color={color}
            background="white"
            border={border}
            padding="2px"
            marginBottom="0px"
            fontWeight="200"
            />

    return {
        source,
        type,
        ownerId,
        bankName,
        salary:  "R$ " + salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        frequency,
        initialDate: format(parseISO(initialDate), 'dd/MM/yyyy'),
        finalDate: finalDate ? format(parseISO(finalDate), 'dd/MM/yyyy') : "--",
        monthReceive: monthReceive ? monthReceive.toString() : "--",
        dayReceive: dayReceive ? dayReceive.toString() : "--",
        status: statusCard,
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
    const [filterYear, setSetFilterYear] = useState([{id: 1, description: new Date().getFullYear()}]);
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
            data.bankName,
            data.salary,
            data.frequency,
            data.initialDate,
            data.finalDate,
            data.monthReceive,
            data.dayReceive,
            data.status,
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

    const handleGetWithFilter = (value) => {
        console.log(value)
        setSetFilterMonth(value);
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
                            data={filterYear}
                            disabled={true}
                            width={"100px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => console.log(value)}
                            value={1}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.month}
                            data={globalStore.monthOfYear}
                            disabled={false}
                            width={"130px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => handleGetWithFilter(value)}
                            value={filterMonth}
                        />
                    </div>
                }
            />

        </>
    );
}