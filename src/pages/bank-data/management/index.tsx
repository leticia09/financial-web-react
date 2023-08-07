import {FunctionComponent, useEffect, useState} from "react";
// @ts-ignore
import {Management} from "../../../components/management/index.tsx";
import * as AiIcons from "react-icons/ai";
// @ts-ignore
import useLoginStore from "../../login/store/useLoginStore.ts";
// @ts-ignore
import {BankDataManagementService} from "../service/index.tsx";

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
    const { id, name, status} = user;
    return { id, name, status, actions };
}

export const BankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const bankDataManagementService = BankDataManagementService();
    const [rows, setRows] = useState([]);

    const actions = [
        <AiIcons.AiOutlineEye className="icon_space" size={16}/>,
        <AiIcons.AiOutlineEdit className="icon_space" size={16}/>,
        <AiIcons.AiOutlineDelete className="icon_delete" size={16}/>,
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bankDataManagementService.getMembers(loginStore.userId);
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
                title="Dados Bancários"
                rows={rows}
                arrayHeader={columns}
                pathBack="/grupos/dados-bancarios/cadastro"
            />
        </>
    );
}