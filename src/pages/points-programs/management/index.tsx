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


const columns: IColumns[]= [
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


function createData(user, actions: React.ReactNode[], index) {
    const { id, program, value,typeOfScore, pointsExpirationDate, status } = user;
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'} />
    ) : status === 'INACTIVE' ? (
        <BulletComponent color="red" showLabel={true} label={'Inativo'}/>
    ) : null;
    let date = pointsExpirationDate;
    if(pointsExpirationDate) {
        date = formatData(pointsExpirationDate);
    }

    return { id, program, typeOfScore, value: value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'), pointsExpirationDate: date, status: statusBullet, actions, key: index };
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
    const pointsService = PointsService();
    const store = usePointFormStore();
    const [rows, setRows] = useState<RowType[]>([]);

    const actions = [
        <div className="icons">
            <AiIcons.AiOutlineEye className="icon_space" size={18}/>
            <AiIcons.AiOutlineEdit className="icon_space" size={18}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}/>
        </div>
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await pointsService.get(loginStore.userId);
                const transformedRows = response.data.data.map((user: any, index: number) => createData(user, actions, index));

                const programsData = await pointsService.getData(loginStore.userId);
                console.log('programsData',programsData)
                store.setGraphicData(programsData.data.data.labels, programsData.data.data.data)

                setRows(transformedRows);
            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    },[]);

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
                labelsData={store.graphicData.labels}
                dataData={store.graphicData.data}
                colorData="#01b8aa"
                labelData="Valor Previsto"
                optionText="Milhas"
            />
        </>
    );
}