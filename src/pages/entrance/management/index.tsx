import {FunctionComponent, useEffect, useState} from "react";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {DashboardComponent} from "../../../components/dashboard";
import {IColumns} from "../../../interfaces/table";
import useLoginStore from "../../login/store/useLoginStore";
import * as AiIcons from "react-icons/ai";
import {EntranceService} from "../service";
import {format, parseISO} from "date-fns";
import {DropdownSingleSelect} from "../../../components/dropdown";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {ButtonComponent} from "../../../components/button";
import useEntranceStore from "../store/useEntranceStore";
import {ModalComponent} from "../../../components/modal";
import {ValidateError} from "../../../validate-error/validate-error";

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
        id: "financialCardName",
        label: "Vale - Cartão",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "moneyId",
        label: "Dinheiro Físico",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "salary",
        label: "Salário Líquido Previsto",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "valueReceived",
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
        minWidth: 60,
        width: 60,
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

function createData(source, type, ownerId, bankName, salary, valueReceived,frequency, initialDate, finalDate, monthReceive, dayReceive, status,financialCardName, moneyId, actions, index, currency) {
    let color = "";
    let border= "";
    if(status === "Aguardando") {
        color = "#ead337";
        border = "0.5px solid #ead337"
    } else if( status === "Confirmado") {
        color = "#46ba52";
        border = "0.5px solid #46ba52"
    } else if(status === "Pendente"){
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
        source,
        type,
        ownerId,
        bankName: bankName? bankName: "--",
        salary: currency ? currency + " "+ salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : moneyId + " "+ salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        valueReceived: valueReceived?  currency + " "+ valueReceived.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : "--",
        frequency,
        initialDate: format(parseISO(initialDate), 'dd/MM/yyyy'),
        finalDate: finalDate ? format(parseISO(finalDate), 'dd/MM/yyyy') : "--",
        monthReceive: monthReceive ? monthReceive.toString() : "--",
        dayReceive: dayReceive ? dayReceive.toString() : "--",
        status: statusCard,
        financialCardName: financialCardName ? financialCardName : "--",
        moneyId: moneyId? "Sim" : "--",
        actions,
        index
    };
}

export const EntranceData: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loginStore = useLoginStore();
    const store = useEntranceStore();
    const service = EntranceService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [cards, setCards] = useState([]);
    const globalStore = useGlobalStore();
    const [filterYear, setSetFilterYear] = useState([{id: 1, description: new Date().getFullYear()}]);
    const [filterMonth, setFilterMonth] = useState(0);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [openModalExclusion, setOpenModalExclusion] = useState(false);
    const [currentId, setCurrentId] = useState();

    const actions = (id) => (
        <div style={{width: "100%", display: "flex", justifyContent:"space-between",alignItems: "center", textAlign:"center"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => console.log(id)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => handleOpenModalExclusion(id)}/>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getData(new Date().getMonth() + 1, filterYear[0].description);
                setFilterMonth(globalStore.monthOfYear.filter(fi => fi.id === new Date().getMonth()+1)[0].id)
                await getGraphic(new Date().getMonth() + 1, filterYear[0].description);

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    const getData = async (month, year) => {
        const response = await service.listWithFilters(loginStore.userId, month, year);
        const transformedRows = response.data.data.map((data: any, index: number) => createData(
            data.source,
            data.type,
            data.owner.name,
            data.bankName,
            data.salary,
            data.valueReceived,
            data.frequency,
            data.initialDate,
            data.finalDate,
            data.monthReceive,
            data.dayReceive,
            data.status,
            data.financialCardName,
            data.money,
            actions(data.id),
            index,
            data.currency
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
        setFilterMonth(value);
        getData(value, filterYear[0].description);
        getGraphic(value, filterYear[0].description);
    }

    const handleOpenModalExclusion = (id) => {
        setOpenModalExclusion(true);
        setCurrentId(id);
    }

    const handleCloseExclusion = () => {
        setOpenModalExclusion(false);
    }

    const exclusion = async () => {
        setIsLoading(true);
        try {
            const response = await service.exclusion(currentId);
            setOpenToast(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    setOpenModalExclusion(false);
                    setIsLoading(false);
                    getData(new Date().getMonth() + 1, filterYear[0].description);
                    getGraphic(new Date().getMonth() + 1, filterYear[0].description);
                }
            }, 3000);

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(false);
            setIsLoading(false);
        }
    };

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
                optionText={Messages.titles.entrance}
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

            <ModalComponent
                openModal={openModalExclusion}
                setOpenModal={handleCloseExclusion}
                label={Messages.titles.exclusion}
                getValue={exclusion}
                Form={
                    <div>
                        <div style={{padding: "10px 10px 0 10px"}}>{Messages.messages.confirm}</div>
                    </div>
                }
                disabledSave={false}
                toastMessage={toastMessage}
                severityType={severity}
                openToast={openToast}
            />

        </>
    );
}