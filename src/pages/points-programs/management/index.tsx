import {FunctionComponent, useEffect, useState} from "react";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {IColumns} from "../../../interfaces/table";
import useLoginStore from "../../login/store/useLoginStore";
import * as AiIcons from "react-icons/ai";
import {PointsService} from "../service";
import {BulletComponent} from "../../../components/bullet";
import {DashboardComponent} from "../../../components/dashboard";
import {format} from "date-fns";
import usePointFormStore from "../creation/store/usePointFormStore";
import {GlobalService} from "../../global-informtions/service";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {ModalComponent} from "../../../components/modal";
import {ModalForm} from "./modal-form/modal-form";
import useUpdateFormStore from "../creation/store/useUpdateFormStore";
import {ValidateError} from "../../../validate-error/validate-error";


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
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
    ) : status === 'INACTIVE' ? (
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

export const PointProgramData: FunctionComponent = () => {
    const loginStore = useLoginStore();

    const formStore = useUpdateFormStore();
    const pointsService = PointsService();
    const store = usePointFormStore();
    const [rows, setRows] = useState<RowType[]>([]);
    const globalService = GlobalService();
    const globalStore = useGlobalStore();
    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalExclusion, setOpenModalExclusion] = useState(false);

    // const datasets = [
    //     {
    //         label: labelData,
    //         data: dataData,
    //         borderColor: colorData,
    //         backgroundColor: colorData,
    //     },
    //     {
    //         label: "Hamilton",
    //         data: dataData,
    //         borderColor: colorData,
    //         backgroundColor: "red",
    //     },
    //     {
    //         label: "Saron",
    //         data: dataData,
    //         borderColor: colorData,
    //         backgroundColor: "grey",
    //     },
    // ]

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
                await getData();
                await getGraphic();

                const programResponse = await globalService.getProgram(loginStore.userId);
                globalStore.setProgram(programResponse.data.data);

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    const getData = async () => {
        const response = await pointsService.get(loginStore.userId);
        setResponses(response.data.data);
        const transformedRows = response.data.data.map((user: any, index: number) => createData(user, actions(index), index));
        setRows(transformedRows);
    }

    const getGraphic = async () => {
        const programsData = await pointsService.getData(loginStore.userId);
        store.setGraphicData(
            programsData.data.data.labels,
            programsData.data.data.dataSet,
            programsData.data.data.totalPoints,
            programsData.data.data.totalMiles,
            programsData.data.data.totalProgramActive,
            programsData.data.data.totalProgramInactive
        );

        let card = {
            label: Messages.titles.totalPoints,
            value: programsData.data.data.totalPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card1 = {
            label: Messages.titles.totalMiles,
            value: programsData.data.data.totalMiles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        let card2 = {
            label: Messages.titles.totalActive,
            value: programsData.data.data.totalProgramActive
        }

        let card3 = {
            label: Messages.titles.totalInactive,
            value: programsData.data.data.totalProgramInactive
        }

        let cards = [];
        cards.push(card);
        cards.push(card1);
        cards.push(card2);
        cards.push(card3);

        setCards(cards);
    }

    const save = async () => {
        setIsLoading(true);
        try {
            const payload = {
                status: formStore.status,
                programId: responses[currentIndex].id,
                userAuthId: loginStore.userId
            }
            const response = await pointsService.updateStatus(payload);
            setSeverity(response.data.severity);
            setOpenToast(true);
            setToastMessage(ValidateError(response.data.message));
            await getData();
            await getGraphic();

            setTimeout(() => {
                setOpen(false);
                setOpenToast(false);
                setIsLoading(false);
            }, 1000);
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
            const response = await pointsService.exclusion(responses[currentIndex].id);
            setOpenToast(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                setOpenModalExclusion(false);
                setIsLoading(false);
                setOpenToast(false);
                getData();
                getGraphic();

            }, 2000);
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
                title={Messages.titles.pointsProgram}
                rows={rows}
                arrayHeader={columns}
                path="/grupos/programa-pontos/programa/cadastro"
                hasAuxButton={true}
                auxPath="/grupos/programa-pontos/programa/tranferencia"
                auxTitle={Messages.titles.transfer}
                dataSets={store.graphicData.dataSet}
                labelsData={store.graphicData.labels}
                optionText={Messages.titles.pointsAndMiles}
                cards={cards}
                hasAuxButton1={true}
                auxPath1="/grupos/programa-pontos/programa/utilizar"
                auxTitle1={Messages.titles.use}
                showLineProgress={isLoading}
            />
            {open &&
                <ModalComponent
                    openModal={open}
                    setOpenModal={handleClose}
                    label={store.graphicData.labels[currentIndex]}
                    getValue={save}
                    Form={
                        [
                            <ModalForm/>
                        ]
                    }
                    disabledSave={false}
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />
            }

            {openModalExclusion &&
                <ModalComponent
                    openModal={openModalExclusion}
                    setOpenModal={handleCloseExclusion}
                    label={Messages.titles.exclusion}
                    getValue={exclusion}
                    Form={
                        [
                            <div>
                                <div style={{
                                    padding: "10px 10px 0 10px"
                                }}>{Messages.messages.confirm}</div>
                            </div>
                        ]
                    }
                    disabledSave={false}
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />
            }

        </>
    );
}