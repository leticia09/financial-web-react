import {FunctionComponent, useEffect, useState} from "react";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {DashboardComponent} from "../../../components/dashboard";
import {IColumns} from "../../../interfaces/table";
import useLoginStore from "../../login/store/useLoginStore";
import * as AiIcons from "react-icons/ai";
import {format, parseISO} from "date-fns";
import {DropdownSingleSelect} from "../../../components/dropdown";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {ButtonComponent} from "../../../components/button";
import useExpenseStore from "../store/useExpenseStore";
import {ExpenseService} from "../service";

const columns: IColumns[] = [
    {
        id: "ownerId",
        label: "Responsável",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "local",
        label: "Descrição",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "macroGroup",
        label: "G. Macro",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "specificGroup",
        label: "G. Específico",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "paymentForm",
        label: "Pagamento",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "finalCard",
        label: "Final Cartão",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "quantityPart",
        label: "Parcelas",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "hasFixed",
        label: "Despesa Fixa",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dateBuy",
        label: "Data Compra",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "value",
        label: "Valor",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "status",
        label: "Pagamento",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "actions",
        label: "Ações",
        minWidth: 60,
        width: 60,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];

type RowType = {
    local: string;
    macroGroup: string;
    specificGroup?: string;
    ownerId: number;
    paymentForm: string;
    finalCard?: number;
    quantityPart?: number;
    hasFixed: string;
    dateBuy: string;
    obs?: string;
    value: number;
    actions: React.ReactNode[];
    index: number;
};

function createData(local, macroGroup, specificGroup, ownerId, paymentForm, finalCard, quantityPart, hasFixed, dateBuy, obs, value, status, currency, actions, index) {
    let color = "";
    let border = "";
    if (status === "Aguardando") {
        color = "#ead337";
        border = "0.5px solid #ead337"
    } else if (status === "Confirmado") {
        color = "#46ba52";
        border = "0.5px solid #46ba52"
    } else if (status === "Pendente") {
        color = "red";
        border = "0.5px solid red"
    } else {
        color = "blue";
        border = "0.5px solid blue"
    }
    const statusCard =
        <ButtonComponent
            label={status}
            disabled={false}
            width="90px"
            height="22px"
            cursor=""
            borderRadius="4px"
            color={color}
            background="white"
            border={border}
            padding="2px"
            marginBottom="0px"
            fontWeight="200"
            action={value => value}
        />
    return {
        local,
        macroGroup,
        specificGroup: specificGroup ? specificGroup : "--",
        ownerId,
        paymentForm,
        finalCard: finalCard ? finalCard.toString() : "--",
        quantityPart: quantityPart ? quantityPart.toString() : "--",
        hasFixed: hasFixed ? "Sim" : "Não",
        dateBuy: dateBuy ? format(parseISO(dateBuy), 'dd/MM/yyyy') : "--",
        obs: obs ? obs : "--",
        value: currency + " " + value,
        status: statusCard,
        actions,
        index
    };
}

export const ExpenseData: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loginStore = useLoginStore();
    const store = useExpenseStore();
    const service = ExpenseService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [cards, setCards] = useState([]);
    const globalStore = useGlobalStore();
    const [filterYear, setFilterYear] = useState([{id: 1, description: new Date().getFullYear() - 1}, {
        id: 2,
        description: new Date().getFullYear()
    }, {id: 3, description: new Date().getFullYear() + 1}]);
    const [filterMonth, setFilterMonth] = useState(0);
    const [year, setYear] = useState(2);
    const actions = (index) => (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center"
        }}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => console.log(index)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => console.log(index)}/>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getData(new Date().getMonth() + 1, filterYear[1].description);
                setFilterMonth(globalStore.monthOfYear.filter(fi => fi.id === new Date().getMonth() + 1)[0].id);
                await getGraphic(new Date().getMonth() + 1, filterYear[1].description);

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    const getData = async (month, year) => {
        const response = await service.listWithFilters(loginStore.userId, month, year);
        const transformedRows = response.data.data.map((data: any, index: number) => createData(
            data.local,
            data.macroGroup,
            data.specificGroup,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            data.paymentForm,
            data.finalCard,
            data.partNumber ? data.partNumber + "/"+ data.quantityPart : data.quantityPart,
            data.hasFixed,
            data.dateBuy,
            data.obs,
            data.value,
            data.status,
            data.currency,
            actions(index),
            index
        ));
        setRows(transformedRows);

    }
    const getGraphic = async (month, year) => {
        const data = await service.getData(loginStore.userId, month, year);
        store.setGraphicData(
            data.data.data.labels,
            data.data.data.dataSet,
            data.data.data.total1,
            data.data.data.total2,
            data.data.data.total3,
            data.data.data.total4
        );

        let card = {
            label: Messages.titles.paymentTotal,
            value: "R$ " + data.data.data.total1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card1 = {
            label: Messages.titles.paymentConfirm,
            value: "R$ " + data.data.data.total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card2 = {
            label: Messages.titles.paymentQuantityOk,
            value: "R$ " + data.data.data.total3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card3 = {
            label: Messages.titles.paymentQuantityNotOk,
            value: "R$ " + data.data.data.total4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let cards = [];
        cards.push(card);
        cards.push(card1);
        cards.push(card2);
        cards.push(card3)

        setCards(cards);
    }

    const handleGetWithFilter = (value) => {
        const year1 = filterYear.filter(y => y.id === year)[0].description;
        setFilterMonth(value);
        getData(value, year1);
        getGraphic(value, year1);
    }
    const handleYear = (value) => {
        const year = filterYear.filter(y => y.id === value)[0];
        setYear(value);
        getData(filterMonth, year.description);
        getGraphic(filterMonth, year.description);
    }

    return (
        <>
            <DashboardComponent
                title={Messages.titles.expense}
                titleButton={Messages.titles.add}
                path="/despesas/cadastro"
                rows={rows}
                arrayHeader={columns}
                dataSets={store.graphicData.dataSet}
                labelsData={store.graphicData.labels}
                optionText={Messages.titles.expense}
                cards={cards}
                showLineProgress={isLoading}
                filters={
                    <div className="register-member">
                        <DropdownSingleSelect
                            label={Messages.titles.year}
                            data={filterYear}
                            disabled={false}
                            width={"100px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => handleYear(value)}
                            value={year}
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