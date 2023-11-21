import React, {FunctionComponent, useEffect, useState} from "react";
import {Management} from "../../../components/management";
import * as AiIcons from "react-icons/ai";
import useLoginStore from "../../login/store/useLoginStore";
import {BankDataManagementService} from "../service";
import "./bankData.css"
import {useNavigate} from "react-router-dom";
import useFormBankStore from "../creation/store/useFormBankStore";
import {ModalComponent} from "../../../components/modal";
import {Messages} from "../../../internationalization/message";
import {ValidateError} from "../../../validate-error/validate-error";
import {IAccordion} from "../../../interfaces/accordion";
import {AccordionComponent} from "../../../components/accordion";
import {TableComponent} from "../../../components/table";
import {IColumns} from "../../../interfaces/table";
import {BulletComponent} from "../../../components/bullet";

const columns: IColumns[] = [
    {
        id: "name",
        label: "Nome",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "finalNumber",
        label: "Final",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "owner",
        label: "Responsável",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "closingDate",
        label: "Data Fechamento",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dueDate",
        label: "Data Vencimento",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "point",
        label: "Pontuação",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "program",
        label: "Programa",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "currency",
        label: "Moeda",
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

function createAccordion(user, index) {
    const accordionAccount = user.accounts.map((account: any, index: number) => createAccount(account));
    return {
        label: user.name,
        Component: <AccordionComponent
            label={accordionAccount[0].label}
            Component={accordionAccount[0].Component}
            showView={false}
            showEdit={true}
            showDelete={true}
        />
    }
}

function createAccount(account) {
    const transformedRows = account.cards.map((user: any, index: number) => createData(user));
    return {
        label: account.accountNumber,
        Component: <TableComponent
            columns={columns}
            rows={transformedRows}
            pagination={true}
            width={"100%"}
        />,
        showEdit: true,
        showDelete: true,
        showView: false
    }
}

function createData(user) {
    const {name, finalNumber, owner, closingDate, dueDate, point, program, currency, status} = user;
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
    ) : status === 'INACTIVE' ? (
        <BulletComponent color="red" showLabel={true} label={'Inativo'}/>
    ) : null;

    let programName = "";
    if (program) {
        programName = program.program;
    }
    return {
        name,
        finalNumber,
        owner: owner.name,
        closingDate,
        dueDate,
        point,
        program: programName,
        currency,
        status: statusBullet
    };
}


export const BankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const useBankStore = useFormBankStore();
    const bankDataManagementService = BankDataManagementService();
    const [accordionData, setAccordionData] = useState([{} as IAccordion]);
    const navigate = useNavigate();
    const [openModalExclusion, setOpenModalExclusion] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);
    const actions = (id: number, index: number) => [
        <div style={{width: "90%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEye onClick={() => handleOpenView(id)} className="icon_space" size={18}/>
            <AiIcons.AiOutlineEdit onClick={() => handleOpenEdit(id)} className="icon_space" size={18}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}
                                     onClick={() => handleOpenModalExclusion(id)}/>
        </div>
    ];

    const handleOpenEdit = (id) => {
        setCurrentId(id);
        useBankStore.setFormType("EDIT");
        navigate(`/grupos/dados-bancarios/${id}`);
    };

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
            const accordion = response.data.data.map((user: any, index: number) => createAccordion(user, index));
            setAccordionData(accordion);

            console.log(accordion)

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
                path="/grupos/dados-bancarios/cadastro"
                showLineProgress={isLoading}
                hasAccordion={true}
                accordionComponent={<div>OLA</div>}
                accordionData={accordionData}
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