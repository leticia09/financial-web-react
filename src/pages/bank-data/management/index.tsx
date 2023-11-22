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
import {IAccordion} from "../../../interfaces/accordion";
import {AccordionComponent} from "../../../components/accordion";
import {TableComponent} from "../../../components/table";
import {IColumns} from "../../../interfaces/table";
import {BulletComponent} from "../../../components/bullet";
import {AccountModalForm} from "./modal/accountModalForm";
import {CardModalForm} from "./modal/cardModalForm";
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

function createData(user, actions) {
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
        status: statusBullet,
        actions
    };
}


export const BankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const useBankStore = useFormBankStore();
    const bankDataManagementService = BankDataManagementService();
    const [accordionData, setAccordionData] = useState([{} as IAccordion]);
    const navigate = useNavigate();
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);
    const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
    const [openBankModalExclusion, setOpenBankModalExclusion] = useState(false);
    const [openAccountModalExclusion, setOpenAccountModalExclusion] = useState(false);
    const [openCardModalExclusion, setOpenCardModalExclusion] = useState(false);
    const [openAccountModalEdit, setOpenAccountModalEdit] = useState(false);
    const [openCardModalEdit, setOpenCardModalEdit] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const actionsBank = (index: number) => [
        <div style={{width: "65px", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEye onClick={() => handleBankOpenView(index)} className="icon_space" size={18}/>
            <AiIcons.AiOutlineEdit onClick={() => handleBankOpenEdit(index)} className="icon_space" size={18}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}
                                     onClick={() => handleBankOpenModalExclusion()}/>
        </div>
    ];

    const actionsAccount = (index: number) => [
        <div style={{width: "65px", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEye onClick={() => handleAccountOpenModalEdit(index, "VIEW")} className="icon_space"
                                  size={18}/>
            <AiIcons.AiOutlineEdit onClick={() => handleAccountOpenModalEdit(index, "EDIT")} className="icon_space"
                                   size={18}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}
                                     onClick={() => handleAccountOpenModalExclusion(index)}/>
        </div>
    ];

    const actionsCard = (index: number) => [
        <div style={{width: "65%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit onClick={() => handleCardOpenModalEdit(index)} className="icon_space" size={18}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18}
                                     onClick={() => handleCardOpenModalExclusion(index)}/>
        </div>
    ];

    function createAccordion(user, index) {
        const accordionAccount = user.accounts.map((account: any, index: number) => createAccount(account, index));
        let accordions = [];
        console.log(accordionAccount)
        accordionAccount.map((accordion, index) => {
            accordions.push(<AccordionComponent
                key={index}
                label={accordion.label}
                Component={accordion.Component}
                status={accordion.status}
                actions={actionsAccount(index)}
                index={index}
                getValue={(value) => setCurrentAccountIndex(value)}
            />)
        })
        return {
            label: user.name,
            Component: accordions,
            actions: actionsBank(index)
        }
    }

    function createAccount(account, index) {
        const transformedRows = account.cards.map((user: any, index: number) => createData(user, actionsCard(index)));
        const statusBullet = account.status === 'ACTIVE' ? (
            <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
        ) : account.status === 'INACTIVE' ? (
            <BulletComponent color="red" showLabel={true} label={'Inativo'}/>
        ) : null;
        console.log(account.status)
        return {
            label: account.accountNumber,
            Component: <TableComponent
                columns={columns}
                rows={transformedRows}
                pagination={true}
                width={"100%"}
            />,
            status: statusBullet,
        }
    }

    const handleBankOpenView = (index) => {
        if (useBankStore.forms[index]) {
            let id = useBankStore.forms[index].id;
            useBankStore.setFormType("VIEW");
            navigate(`/grupos/dados-bancarios/${id}`);
        }
    };
    const handleBankOpenEdit = (index) => {
        if (useBankStore.forms[index]) {
            let id = useBankStore.forms[index].id;
            useBankStore.setFormType("EDIT");
            navigate(`/grupos/dados-bancarios/${id}`);
        }
    };

    const handleBankOpenModalExclusion = () => {
        setOpenBankModalExclusion(true);
    }

    const handleBankCloseExclusion = () => {
        setOpenBankModalExclusion(false);
    }

    const handleAccountOpenModalEdit = (index: number, mode) => {
        setCurrentAccountIndex(index);
        useBankStore.setFormType(mode);
        getData();
        setOpenAccountModalEdit(true);
    }

    const handleAccountCloseEdit = () => {
        setOpenAccountModalEdit(false);
    }
    const handleAccountOpenModalExclusion = (index: number) => {
        setCurrentAccountIndex(index);
        setOpenAccountModalExclusion(true);
    }

    const handleAccountCloseExclusion = () => {
        setOpenAccountModalExclusion(false);
    }
    const handleCardOpenModalEdit = (index: number) => {
        setCurrentCardIndex(index);
        setOpenCardModalEdit(true);

    }

    const handleCardCloseEdit = () => {
        setOpenCardModalEdit(false);
    }

    const handleCardOpenModalExclusion = (index: number) => {
        setOpenCardModalExclusion(true);
    }

    const handleCardCloseExclusion = () => {
        setOpenCardModalExclusion(false);
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
            useBankStore.setForms(response.data.data);
            setAccordionData(accordion);

        } catch (error) {
            console.log('Error', error);
        }
    }

    const exclusionBank = async () => {
        setIsLoading(true);
        try {
            const response = await bankDataManagementService.exclusion(useBankStore.forms[useBankStore.currentBankIndex].id);
            setOpenToast(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    setOpenBankModalExclusion(false);
                    setIsLoading(false);
                    getData();
                }
            }, 2000);

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(false);
            setIsLoading(false);
        }
    };

    const exclusionAccount = async () => {
        setIsLoading(true);
        try {
            const response = await bankDataManagementService.exclusionAccount(useBankStore.forms[useBankStore.currentBankIndex].accounts[currentAccountIndex].id);
            setOpenToast(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    setOpenAccountModalExclusion(false);
                    setIsLoading(false);
                    getData();
                }
            }, 2000);

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(false);
            setIsLoading(false);
        }
    };

    const exclusionCard = async () => {
        setIsLoading(true);
        try {
            const response = await bankDataManagementService.exclusionCard(
                useBankStore.forms[useBankStore.currentBankIndex].accounts[currentAccountIndex].cards[currentCardIndex].id);
            setOpenToast(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    setOpenCardModalExclusion(false);
                    setIsLoading(false);
                    getData();
                }
            }, 2000);

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(false);
            setIsLoading(false);
        }
    }

    const editAccount = async () => {
        setIsLoading(true);
        try {
            const response = await bankDataManagementService.editAccount(useBankStore.forms[useBankStore.currentBankIndex].accounts[currentAccountIndex]);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setOpenToast(true);
            setTimeout(() => {
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    setOpenAccountModalEdit(false);
                    setIsLoading(false);
                    getData();
                }
            }, 2000);

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(false);
            setIsLoading(false);
        }
    };
    const editCard = async () => {
        setIsLoading(true);
        try {
            const response = await bankDataManagementService.editCard(
                useBankStore.forms[useBankStore.currentBankIndex]
                    .accounts[currentAccountIndex]
                    .cards[currentCardIndex]
            );
            setToastMessage(ValidateError(response.data.message));
            setSeverity(response.data.severity);
            setOpenToast(true);
            setTimeout(() => {
                if (response.data.severity === "success") {
                    setOpenToast(false);
                    setOpenAccountModalEdit(false);
                    setIsLoading(false);
                    getData();
                }
            }, 2000);

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpenToast(false);
            setIsLoading(false);
        }
    };

    const teste = () => {
        console.log()
    };

    return (
        <>
            <Management
                title="Dados Bancários"
                path="/grupos/dados-bancarios/cadastro"
                showLineProgress={isLoading}
                hasAccordion={true}
                accordionData={accordionData}
                getValue={(value) => useBankStore.setCurrentBankIndex(value)}

            />
            <button onClick={teste}>TESTE</button>
            {(useBankStore.forms[useBankStore.currentBankIndex] && useBankStore.forms[useBankStore.currentBankIndex].accounts) &&
                <ModalComponent
                    openModal={openAccountModalEdit}
                    setOpenModal={handleAccountCloseEdit}
                    label={Messages.titles.account}
                    getValue={editAccount}
                    Form={
                        <AccountModalForm
                            currentForm={useBankStore.forms[useBankStore.currentBankIndex].accounts[currentAccountIndex]}
                            mode={useBankStore.formType}
                            updateAccountValue={(field, value) => {
                                useBankStore.updateAccountField(useBankStore.currentBankIndex, currentAccountIndex, field, value);
                            }}
                        />
                    }
                    disabledSave={false}
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />
            }
            {useBankStore.forms[useBankStore.currentBankIndex] && useBankStore.forms[useBankStore.currentBankIndex].accounts[currentAccountIndex] &&
                <ModalComponent
                    openModal={openCardModalEdit}
                    setOpenModal={handleCardCloseEdit}
                    label={Messages.titles.card}
                    getValue={editCard}
                    Form={
                        <CardModalForm
                            currentForm={useBankStore.forms[useBankStore.currentBankIndex].accounts[currentAccountIndex].cards[currentCardIndex]}
                            updateCardValue={(field, value) => {
                                useBankStore.updateCardField(useBankStore.currentBankIndex, currentAccountIndex, currentCardIndex, field, value);
                            }}
                        />
                    }
                    disabledSave={false}
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />
            }

            <ModalComponent
                openModal={openBankModalExclusion}
                setOpenModal={handleBankCloseExclusion}
                label={Messages.titles.exclusion}
                getValue={exclusionBank}
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

            <ModalComponent
                openModal={openAccountModalExclusion}
                setOpenModal={handleAccountCloseExclusion}
                label={Messages.titles.exclusion}
                getValue={exclusionAccount}
                Form={
                    <div>
                        <div style={{padding: "10px 10px 0 10px"}}>{Messages.messages.exclusionAccount}</div>
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

            <ModalComponent
                openModal={openCardModalExclusion}
                setOpenModal={handleCardCloseExclusion}
                label={Messages.titles.exclusion}
                getValue={exclusionCard}
                Form={
                    <div>
                        <div style={{padding: "10px 10px 0 10px"}}>{Messages.messages.confirm}</div>
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