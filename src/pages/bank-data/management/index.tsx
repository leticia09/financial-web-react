import React, {FunctionComponent, useEffect, useState} from "react";
import {Management} from "../../../components/management";
import * as AiIcons from "react-icons/ai";
import useLoginStore from "../../login/store/useLoginStore";
import {BankDataManagementService} from "../service";
import "./bankData.css"
import {useNavigate} from "react-router-dom";
import useFormBankStore from "../creation/store/useFormBankStore";
import {IColumns} from "../../../interfaces/table";
import {ModalComponent} from "../../../components/modal";
import {Messages} from "../../../internationalization/message";
import {ValidateError} from "../../../validate-error/validate-error";

const columns: IColumns[] = [
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
    const [openModalExclusion, setOpenModalExclusion] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);

    const actions = (id: number) => [
        <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEye onClick={() => handleOpenView(id)} className="icon_space" size={18}/>
            {/*<AiIcons.AiOutlineEdit className="icon_space" size={18}/>*/}
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => handleOpenModalExclusion(id)}/>
        </div>
    ];

    const handleOpenModalExclusion = (id: number) => {
        setCurrentId(id);
        setOpenModalExclusion(true);
    }

    const handleCloseExclusion = () => {
        setOpenModalExclusion(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            getData();
        }
        fetchData().then();
    }, []);

    const getData = async () => {
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

    const handleOpenView = (id) => {
        useBankStore.setFormType("VIEW");
        navigate(`/grupos/dados-bancarios/${id}`);
    }

    const exclusion = async () => {
        setIsLoading(true);
        try {
            const response = await bankDataManagementService.exclusion(currentId);
            setSeverity(response.data.severity);
            setOpenToast(true);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                setOpenModalExclusion(false);
                setIsLoading(false);
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    getData();
                }

            }, 2000);
        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(true);
            setIsLoading(false);
        }

    };

    return (
        <>
            <Management
                title="Dados Bancários"
                rows={rows}
                arrayHeader={columns}
                path="/grupos/dados-bancarios/cadastro"
                showLineProgress={isLoading}
            />
            <ModalComponent
                openModal={openModalExclusion}
                setOpenModal={handleCloseExclusion}
                label={Messages.titles.exclusion}
                getValue={exclusion}
                Form={
                    <div>
                        <div style={{padding: "10px 10px 0 10px"}}>{Messages.messages.exclusionBank}</div>
                        <div style={{
                            padding: "10px 10px 0 10px",
                            color: "red"
                        }}>{Messages.messages.confirm}</div>
                    </div>
                }
                disabledSave={false}
                toastMessage={toastMessage}
                severityType={severity}
                openToast={openToast}
            />
        </>
    );
}