import {FunctionComponent, useEffect, useState} from "react";
import {Management} from "../../../components/management";
import * as AiIcons from "react-icons/ai";
import useLoginStore from "../../login/store/useLoginStore";
import {BankDataManagementService} from "../service";
import "./bankData.css"
import {useNavigate} from "react-router-dom";
import useFormBankStore from "../creation/store/useFormBankStore";
import {IColumns} from "../../../interfaces/table";

const columns :IColumns[] = [
    {
        id: "name",
        label: "Nome",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "accountsNumber",
        label: "Nº Contas",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "cardsNumber",
        label: "Nº Cartões",
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

function createData(name, accountsNumber, cardsNumber, actions: React.ReactNode[]) {
    return {name, accountsNumber, cardsNumber, actions};
}

export const BankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const useBankStore = useFormBankStore();
    const bankDataManagementService = BankDataManagementService();
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const actions = (id) => [
        <div className="icons">
            <AiIcons.AiOutlineEye  onClick={() => handleOpenView(id)} className="icon_space" size={18}/>
            <AiIcons.AiOutlineEdit className="icon_space" size={18}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}/>
        </div>
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bankDataManagementService.getRegisterBank(loginStore.userId);

                const transformedRows = response.data.data.map((data) => {
                    let count = 0;
                    data.accounts.forEach(account => {
                        count += account.cards.length;
                    });
                    return createData(data.name, data.accounts.length.toString(), count.toString(), actions(data.id))
                });
                setRows(transformedRows);

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchData().then();
    });

    const handleOpenView = (id) => {
        useBankStore.setFormType("VIEW");
        navigate(`/grupos/dados-bancarios/${id}`);
    }

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