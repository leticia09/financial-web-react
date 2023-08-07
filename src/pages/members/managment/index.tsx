import {FunctionComponent, useEffect, useState} from "react";
import './membersManagment.css'
// @ts-ignore
import {TableComponent} from "../../../components/table/index.tsx";
// @ts-ignore
import {MembersManagmentService} from "./service/index.tsx";
import * as AiIcons from "react-icons/ai";
// @ts-ignore
import {ButtonComponent} from "../../../components/button/index.tsx";
// @ts-ignore
import {Messages} from "../../../internationalization/message/index.ts";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import useLoginStore from "../../login/store/useLoginStore.ts";

const columns = [
    {
        id: "name",
        label: "Nome",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "cpf",
        label: "CPF",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "email",
        label: "E-mail",
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
        id: "permissao",
        label: "Permissão",
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
    const { id, name, cpf, email, permissao } = user;
    return { id, name, cpf, email, status: "Ativo", permissao, actions };
}

export const Members: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const membersManagmentService = MembersManagmentService()
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [rowse, setRowse] = useState([]);

    const actions = [
        <AiIcons.AiOutlineEye className="icon_space" size={16}/>,
        <AiIcons.AiOutlineEdit className="icon_space" size={16}/>,
        <AiIcons.AiOutlineDelete className="icon_delete" size={16}/>,
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await membersManagmentService.getMembers(loginStore.userId);
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
            <div className="content">
                <div className="labels">
                    <h3>Membros</h3>

                    <div className="button-create">
                        <ButtonComponent
                            label={Messages.titles.add}
                            disabled={false}
                            width="100px"
                            height="40px"
                            cursor="pointer"
                            borderRadius="6px"
                            color="white"
                            background="#05465f"
                            padding="2px"
                            marginBottom="20px"
                            fontWeight="600"
                            maxHeight="40px"
                            action={() => {
                                navigate("/grupos/membros/cadastro")
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="content-grid">
                <TableComponent
                    columns={columns}
                    rows={rows}
                />
            </div>
        </>
    );
}