import {FunctionComponent, useEffect, useState} from "react";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {IColumns} from "../../../interfaces/table";
import useLoginStore from "../../login/store/useLoginStore";
import * as AiIcons from "react-icons/ai";
import {BulletComponent} from "../../../components/bullet";
import {DashboardComponent} from "../../../components/dashboard";
import {format} from "date-fns";
import {MovementBankService} from "../service";
import movementBankStore from "../store";


const columns: IColumns[] = [
    {
        id: "owner",
        label: "Titular",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "program",
        label: "Programa",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "typeOfScore",
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
        id: "pointsExpirationDate",
        label: "Data de Expiração",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "status",
        label: "Status",
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


function createData(user, actions, index) {
    const {id, owner, program, value, typeOfScore, pointsExpirationDate, status} = user;
    const statusBullet = status === 1 ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
    ) : status === 2 ? (
        <BulletComponent color="red" showLabel={true} label={'Inativo'}/>
    ) : null;
    let date = pointsExpirationDate;
    if (pointsExpirationDate) {
        date = formatData(pointsExpirationDate);
    }

    return {
        id,
        owner: owner.name,
        ownerID: owner.id,
        program,
        typeOfScore,
        value: value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        pointsExpirationDate: date,
        status: statusBullet,
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
    const service = MovementBankService();
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
        <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => handleOpen(index)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => handleOpenModalExclusion(index)}/>
        </div>
    );


    useEffect(() => {
        const fetchData = async () => {
            try {
               // await getData();
                await getGraphic();

                // const programResponse = await globalService.getProgram(loginStore.userId);
                // globalStore.setProgram(programResponse.data.data);

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    const getData = async () => {
        // const response = await pointsService.get(loginStore.userId);
        // setResponses(response.data.data);
        // const transformedRows = response.data.data.map((user: any, index: number) => createData(user, actions(index), index));
        // setRows(transformedRows);
        // setCurrentForm(response.data.data);

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
            label: Messages.titles.totalMoney,
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
            label: Messages.titles.totalDollar,
            value: "U$ " + data.data.data.total4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
                path="/grupos/programa-pontos/programa/cadastro"
                title={Messages.titles.movementBank}
                rows={rows}
                arrayHeader={columns}
                hasAuxButton={true}
                auxTitle={Messages.titles.pay}
                auxPath="/grupos/programa-pontos/programa/tranferencia"
                dataSets={store.graphicData.dataSet}
                labelsData={store.graphicData.labels}
                optionText={Messages.titles.pointsAndMiles}
                cards={cards}
                hasAuxButton1={true}
                auxTitle1={Messages.titles.receive}
                auxPath1="/movimentacao-bancaria/receber"
                showLineProgress={isLoading}
            />

        </>
    );
}