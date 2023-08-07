import {FunctionComponent, useEffect, useState} from "react";
import * as AiIcons from "react-icons/ai";
// @ts-ignore
import {MembersManagmentService} from "./service/index.tsx";
// @ts-ignore
import useLoginStore from "../../login/store/useLoginStore.ts";
// @ts-ignore
import {Management} from "../../../components/management/index.tsx";

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
        width: 90,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];

function createData(user, actions: React.ReactNode[]) {
    const {id, name} = user;
    return {id, name,status: "Ativo", actions};
}

export const Members: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const membersManagementService = MembersManagmentService()
    const [rows, setRows] = useState([]);

    const actions = [
        <AiIcons.AiOutlineEye className="icon_space" size={16}/>,
        <AiIcons.AiOutlineEdit className="icon_space" size={16}/>,
        <AiIcons.AiOutlineDelete className="icon_delete" size={16}/>,
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await membersManagementService.getMembers(loginStore.userId);
                const transformedRows = response.data.data.map((user) => createData(user, actions));
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
                arrayActions={actions}
                rows={rows}
                arrayHeader={columns}
                pathBack="/grupos/membros/cadastro"
            />
        </>
    );
}