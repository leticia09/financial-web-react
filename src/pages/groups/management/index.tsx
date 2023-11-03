import React, {FunctionComponent, useEffect, useState} from "react";
import * as AiIcons from "react-icons/ai";
import useLoginStore from "../../login/store/useLoginStore";
import {Management} from "../../../components/management";
import "../../bank-data/management/bankData.css"
import {IColumns} from "../../../interfaces/table";
import {BulletComponent} from "../../../components/bullet";
import {Messages} from "../../../internationalization/message";
import {GroupsService} from "../service";

const columns: IColumns[]= [
    {
        id: "name",
        label: "Grupo Macro",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "specificNumbers",
        label: "Grupos Específicos",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "status",
        label: "Status",
        minWidth: 70,
        align: "right",
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
    const {id, name, specificGroups, status} = user;
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
    ) : status === 'INACTIVE' ? (
        <BulletComponent color="red" showLabel={true} label={'Inativo'} />
    ) : null;

    const names = specificGroups.map(obj => obj.name);
    return {id, name, specificNumbers: names.join(', '), status: statusBullet, actions, key: index};
}
type RowType = {
    id: number;
    name: string;
    status: string;
    actions: React.ReactNode[];
};


export const Groups: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const [rows, setRows] = useState<RowType[]>([]);
    const service = GroupsService();
    const actions = [
        <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} />
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}/>
        </div>
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.getData(loginStore.userId);
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
            <Management
                title={Messages.titles.groups}
                rows={rows}
                arrayHeader={columns}
                path="/grupos/grupos/cadastro"
            />
        </>
    );
}