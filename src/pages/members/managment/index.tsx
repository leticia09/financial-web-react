import {FunctionComponent, useEffect, useState} from "react";
import * as AiIcons from "react-icons/ai";
// @ts-ignore
import {MembersManagmentService} from "./service/index.tsx";
// @ts-ignore
import useLoginStore from "../../login/store/useLoginStore.ts";
// @ts-ignore
import {Management} from "../../../components/management/index.tsx";
import "../../bank-data/management/bankData.css"

const columns = [
    {
        id: "name",
        label: "Nome",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
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
    const {id, name, status} = user;
    return {id, name, status, actions, key: index};
}
type RowType = {
    id: number;
    name: string;
    status: string;
    actions: React.ReactNode[];
};


export const Members: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const membersManagementService = MembersManagmentService()
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
                const response = await membersManagementService.getMembers(loginStore.userId);
                const transformedRows = response.data.data.map((user: any, index: number) => createData(user, actions, index));
                setRows(transformedRows);
            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    }, []);

    return (
        <>
            <Management
                title="Membros"
                rows={rows}
                arrayHeader={columns}
                pathBack="/grupos/membros/cadastro"
            />
        </>
    );
}