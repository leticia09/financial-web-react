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

const menuOptions = [
    {label: "Cartão",path: "/grupos/programa-pontos/cartao/cadastro" },
    {label: "Programa",path: "/grupos/programa-pontos/programa/cadastro" }
];

const columns: IColumns[]= [
    {
        id: "program",
        label: "Programa",
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

const columns2: IColumns[]= [
    {
        id: "final",
        label: "Final",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "account",
        label: "Conta",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "bank",
        label: "Banco",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "point",
        label: "Pontuação",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "currentPoint",
        label: "Moeda",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
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

export const option = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Milhas",
        },
    },
};

const labels = [
    "Livelo",
    "Esfera",
    "Smiles",
    "Latam",
    "C6",
    "Aadvantage",
    "Iberian",
    "Tap",
    "Aadvantage",
    "Iberian",
    "Tap"
];

export const data = {
    labels,
    datasets: [
        {
            label: "Valor Previsto",
            data: [41500, 120000, 50000, 30000, 18000, 60000, 340233, 540321, 60000, 340233, 540321],
            borderColor: "#01b8aa",
            backgroundColor: "#01b8aa",
        },
    ],
};

function createData(user, actions: React.ReactNode[], index) {
    const { id, program, value, pointsExpirationDate, status } = user;
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={false} />
    ) : status === 'INACTIVE' ? (
        <BulletComponent color="red" showLabel={false} />
    ) : null;
    let date = pointsExpirationDate;
    if(pointsExpirationDate) {
        date = formatData(pointsExpirationDate);
    }

    return { id, program, value: value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'), pointsExpirationDate: date, status: statusBullet, actions, key: index };
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
    const pointsService = PointsService()
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
                path="/grupos/programa-pontos/cartao/cadastro"
                haveMenu={true}
                menuOptions={menuOptions}
                hasMoreTable={true}
                moreTableArrayHeader={columns2}
                moreTableRows={rows}
            />
        </>
    );
}