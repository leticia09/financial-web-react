import {FunctionComponent, useEffect, useState} from "react";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {IColumns} from "../../../interfaces/table";
import useLoginStore from "../../login/store/useLoginStore";
import * as AiIcons from "react-icons/ai";
import {DashboardComponent} from "../../../components/dashboard";
import {format} from "date-fns";
import {MovementBankService} from "../service";
import movementBankStore from "../store";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {GlobalService} from "../../global-informtions/service";


const columns: IColumns[] = [
    {
        id: "type",
        label: "Tipo",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "value",
        label: "Valor",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "referencePeriod",
        label: "Período de Rerência",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "ownerId",
        label: "Titular",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "expenseId",
        label: "Despesa",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "entranceId",
        label: "Receita",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },

    {
        id: "dateMovement",
        label: "Data Movimentação",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },

    {
        id: "bankId",
        label: "Banco",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "obs",
        label: "Observação",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "actions",
        label: "Ações",
        minWidth: 50,
        width: 50,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];


function createData(value, bankId, dateMovement, entranceId, expenseId, obs, ownerId, referencePeriod, type, currency, actions, index) {
    let date = dateMovement;
    if (dateMovement) {
        date = formatData(dateMovement);
    }
    return {
        value: currency + " " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        bankId,
        dateMovement: date,
        entranceId: entranceId ? entranceId.toString() : "--",
        expenseId: expenseId ? expenseId.toString() : "--",
        obs: obs ? obs : "--",
        ownerId,
        referencePeriod,
        type,
        actions,
        key: index
    };
}

type RowType = {
    id: number;
    name: string;
    status: string;
    actions: React.ReactNode[];
};

function formatData(inputDate: string): string {
    const date = new Date(inputDate);
    const formattedDate = format(date, 'dd/MM/yyyy');
    return formattedDate;
}

export const BankMovementData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const store = movementBankStore();
    const globalStore = useGlobalStore();
    const service = MovementBankService();
    const globalService = GlobalService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalExclusion, setOpenModalExclusion] = useState(false);
    const [currentForm, setCurrentForm] = useState([])

    const handleOpen = (index) => {
        setCurrentIndex(index);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const actions = (index) => (
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => console.log(index)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => console.log(index)}/>
        </div>
    );


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('aaaaaaaaa')
                await getExpense();
                await getEntrance();
                await getData();
                await getGraphic();
            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    const getData = async () => {
        const response = await service.get(loginStore.userId);
        setResponses(response.data.data);

        const transformedRows = response.data.data.map((data: any, index: number) => createData(
            data.value,
            globalStore.bank.filter(ba => ba.id === data.bankId)[0] ? globalStore.bank.filter(ba => ba.id === data.bankId)[0].name : "--",
            data.dateMovement,
            data.entranceId &&  globalStore.entrance.filter(en => en.id === data.entranceId)[0] ? globalStore.entrance.filter(en => en.id === data.entranceId)[0].description : null,
            data.expenseId ? globalStore.expense.filter(ex => ex.id === data.expenseId)[0].local : null,
            data.obs,
            data.ownerId ? globalStore.members.filter(me => me.id === data.ownerId)[0].name : null,
            data.referencePeriod,
            data.type,
            data.currency,
            actions(index),
            index));
        setRows(transformedRows);
        setCurrentForm(response.data.data);

    }

    const getEntrance = async () => {
        const entrance = await globalService.getEntrance(loginStore.userId);
        let list = [];
        entrance.data.data.forEach(res => {
            list.push({
                id: res.id,
                description: res.source + " - " + res.type,
                salary: res.currency + " " + res.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                ownerId: res.owner.id,
            })
        })
        globalStore.setEntrance(list);
    }

    const getExpense = async () => {
        const expense = await globalService.getExpense(loginStore.userId);
        globalStore.setExpense(expense.data.data);
    }

    const getGraphic = async () => {
        const data = await service.getData(loginStore.userId);
        store.setGraphicData(
            data.data.data.labels,
            data.data.data.dataSet,
            data.data.data.total1,
            data.data.data.total2,
            data.data.data.total3,
            data.data.data.total4,
            data.data.data.tooltipLabel,
        );

        let card = {
            label: Messages.titles.totalMoney + " - R$",
            value: "R$ " + data.data.data.total1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card1 = {
            label: Messages.titles.totalAvailable,
            value: "R$ " + data.data.data.total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card2 = {
            label: Messages.titles.totalGoal,
            value: "R$ " + data.data.data.total3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card3 = {
            label: Messages.titles.totalMoney + " - US$",
            value: "US$ " + data.data.data.total4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let cards = [];
        cards.push(card);
        cards.push(card1);
        cards.push(card2);
        cards.push(card3)

        setCards(cards);
    }

    const save = async () => {
        setIsLoading(true);
        try {
            // const payload = {
            //     status: formStore.status,
            //     value: formStore.value,
            //     programId: responses[currentIndex].id,
            //     userAuthId: loginStore.userId
            // }
            // const response = await pointsService.updateStatus(payload);
            // setSeverity(response.data.severity);
            // setOpenToast(true);
            // setToastMessage(ValidateError(response.data.message));
            // await getData();
            // await getGraphic();
            //
            // setTimeout(() => {
            //     setOpenToast(false);
            //     setIsLoading(false);
            //     if (response.data.severity === "success")
            //         setOpen(false);
            // }, 1000);
        } catch (e) {
            setSeverity("error");
            setIsLoading(false);
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(true);
        }
    }
    const handleOpenModalExclusion = (index) => {
        setCurrentIndex(index);
        setOpenModalExclusion(true);
    }
    const handleCloseExclusion = () => {
        setOpenModalExclusion(false);
    }
    const exclusion = async () => {
        setIsLoading(true);
        try {
            // const response = await pointsService.exclusion(responses[currentIndex].id);
            // setOpenToast(true);
            // setSeverity(response.data.severity);
            // setToastMessage(ValidateError(response.data.message));
            // setTimeout(() => {
            //     setIsLoading(false);
            //     setOpenToast(false);
            //     if (response.data.severity === "success") {
            //         setOpenModalExclusion(false);
            //         getData();
            //         getGraphic();
            //     }
            // }, 2000);
        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
            setIsLoading(false);
        }

    };

    return (
        <>
            <DashboardComponent
                titleButton={Messages.titles.transfer}
                path="/movimentacao-bancaria/transferir"
                title={Messages.titles.movementBank}
                rows={rows}
                arrayHeader={columns}
                hasAuxButton={true}
                auxTitle={Messages.titles.pay}
                auxPath="/movimentacao-bancaria/pagar"
                dataSets={store.graphicData.dataSet}
                labelsData={store.graphicData.labels}
                optionText={Messages.titles.movementBank}
                cards={cards}
                hasAuxButton1={true}
                auxTitle1={Messages.titles.receive}
                auxPath1="/movimentacao-bancaria/receber"
                showLineProgress={isLoading}
                tooltipLabel={store.graphicData.tooltipLabel}
            />
        </>
    );
}