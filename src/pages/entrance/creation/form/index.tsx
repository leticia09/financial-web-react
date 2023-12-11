import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import {ButtonComponent} from "../../../../components/button";
import useLoginStore from "../../../login/store/useLoginStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useEntranceStore from "../../store/useEntranceStore";
import {ModalComponent} from "../../../../components/modal";
import {EntranceService} from "../../service";
import {TypeSalaryForm} from "./typeSalaryForm";
import {ValidateError} from "../../../../validate-error/validate-error";
import {TableComponent} from "../../../../components/table";
import {IColumns} from "../../../../interfaces/table";
import * as AiIcons from "react-icons/ai";
import {InputDataComponent} from "../../../../components/input-data";

interface IForm {
    i: number;
    hasDelete: boolean;
}

const columns: IColumns[] = [
    {
        id: "source",
        label: "Fonte",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "type",
        label: "Tipo",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "ownerId",
        label: "Titular",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "bankId",
        label: "Banco",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "accountNumber",
        label: "Conta",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "salary",
        label: "Salário Líquido",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "frequency",
        label: "Periodicidade",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "frequency",
        label: "Periodicidade",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "initialDate",
        label: "Data Inicial",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "finalDate",
        label: "Data Final",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dayReceive",
        label: "Dia de Receber",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "mouthReceive",
        label: "Mês de Receber",
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

function createData(source, type, ownerId, bankId, accountNumber, salary, frequency, initialDate, finalDate, monthReceive, dayReceive, actions, index) {
    return {
        source,
        type,
        ownerId,
        bankId,
        accountNumber: accountNumber.toString(),
        salary: salary.toString(),
        frequency,
        initialDate,
        finalDate,
        monthReceive: monthReceive ? monthReceive.toString() : null,
        dayReceive: dayReceive ? dayReceive.toString() : null,
        actions,
        index
    };
}

type RowType = {
    source: string;
    type: string;
    ownerId: number;
    salary: number;
    bankId: number;
    accountNumber: number;
    actions: React.ReactNode[];
    index: number;
};

export const EntranceForm: FunctionComponent = () => {

    const formStore = useEntranceStore();
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const [openModal, setOpenModal] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [typeSalaryData, setTypeSalaryData] = useState([]);
    const service = EntranceService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [accountData, setAccountData] = useState([]);
    const [open, setOpen] = useState(false);

    const actions = (index) => (
        <div style={{width: "50%", display: "flex"}}>
            <AiIcons.AiOutlineDelete style={{marginLeft: "6px"}} className="icon_delete" size={18}
                                     onClick={() => deleteItemFormList(index)}/>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            await getSalary();
        };
        fetchData();

        formStore.resetFormStore();

    }, []);

    const getSalary = async () => {
        const typeSalaryResponse = await service.getTypeSalary(loginStore.userId);
        setTypeSalaryData(typeSalaryResponse.data);
    }

    const handleAdd = () => {
        const updateList = [...formStore.formList];
        updateList.push(
            {
                source: formStore.form.source,
                type: typeSalaryData.filter(ts => ts.id === formStore.form.type)[0].description,
                ownerId: formStore.form.ownerId,
                salary: formStore.form.salary,
                bankId: formStore.form.bankId,
                accountNumber: formStore.form.accountNumber,
                userAuthId: loginStore.userId,
                index: updateList.length,
                frequency: globalStore.frequency.filter(fre => fre.id === formStore.form.frequency)[0].description,
                initialDate: formStore.form.initialDate ? formStore.form.initialDate: null,
                finalDate: formStore.form.finalDate ? formStore.form.finalDate : null,
                monthReceive: formStore.form.monthReceive && formStore.form.monthReceive !== 0 ? formStore.form.monthReceive : null,
                dayReceive: formStore.form.dayReceive && formStore.form.dayReceive !== 0 ? formStore.form.dayReceive: null,
            }
        )
        formStore.setFormList(updateList);
        const transformedRows = updateList.map((data: any, index: number) => createData(
            data.source,
            data.type,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            data.bankId,
            data.accountNumber,
            data.salary,
            data.frequency,
            data.initialDate,
            data.finalDate,
            data.monthReceive,
            data.dayReceive,
            actions(index),
            index
        ));
        setRows(transformedRows);
        formStore.resetForm();
    }
    const handleAction = () => {
        setOpenModal(true);
    }

    const handleClose = async () => {
        setOpenModal(false);
    };
    const deleteItemFormList = async (i) => {
        let list = formStore.deleteItemFormList(i);

        const transformedRows = list.map((data: any, index: number) => createData(
            data.source,
            typeSalaryData.filter(ts => ts.id === data.type)[0].description,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            globalStore.bank.filter(ba => ba.id === data.bankId)[0].name,
            data.accountNumber,
            data.salary,
            data.frequency,
            data.initialDate,
            data.finalDate,
            data.monthReceive,
            data.dayReceive,
            actions(index),
            index
        ));
        setRows(transformedRows);
    }


    const createPayload = (form: any[]) => {
        let response = [];

        form.forEach(fo => {
            const res = {
                description: fo.description,
                userAuthId: loginStore.userId,
                deleted: false,
            }
            response.push(res);
        })

        return response;
    }

    const editType = async () => {
        try {
            let response = await service.edit(createPayload(formStore.typeSalary));

            if (response.data.message === "success") {
                setOpenToast(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);

                setTimeout(async () => {
                    if (response.data.severity === "success") {
                        setOpenToast(false);
                        setOpenModal(false);
                        await getSalary();
                    }
                }, 2000);

            } else {
                setOpenToast(true);
                setOpenModal(false);
                setSeverity("error");
                setToastMessage(ValidateError(response.data.message));
            }

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
        }
    };

    const handleBank = (value) => {
        formStore.setBankId(value);
        setAccountData(globalStore.bank.filter(ba => ba.id === value)[0].accounts);
    }

    return (
        <>
            <div className="register-member">
                <Input
                    label={Messages.titles.source}
                    disabled={false}
                    width="200px"
                    getValue={(value) => formStore.setSource(value)}
                    inputValue={formStore.form.source}
                />
                <DropdownSingleSelect
                    label={Messages.titles.typeOfEntrance}
                    data={typeSalaryData}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => formStore.setType(value)}
                    value={formStore.form.type}
                    labelAction={"Gerenciar Tipos"}
                    getAction={handleAction}
                />
                <DropdownSingleSelect
                    label={Messages.titles.owner}
                    data={globalStore.members}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => formStore.setOwnerId(value)}
                    value={formStore.form.ownerId}
                />

                <DropdownSingleSelect
                    label={Messages.titles.bank}
                    data={globalStore.bank}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => handleBank(value)}
                    value={formStore.form.bankId}
                />

            </div>
            <div className="register-member">
                <DropdownSingleSelect
                    label={Messages.titles.account}
                    data={accountData}
                    disabled={!formStore.form.bankId}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"accountNumber"}
                    getValue={(value) => formStore.setAccountNumber(value)}
                    value={formStore.form.accountNumber}
                />
                <Input
                    label={Messages.titles.salaryValue}
                    disabled={false}
                    width="200px"
                    maskNumeric={true}
                    getValue={(value) => formStore.setSalary(value)}
                    inputValue={formStore.form.salary}
                />

                <DropdownSingleSelect
                    label={Messages.titles.frequency}
                    data={globalStore.frequency}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => formStore.setFrequency(value)}
                    value={formStore.form.frequency}
                />

                {(formStore.form.frequency.toString() === "2") &&
                    <DropdownSingleSelect
                        label={Messages.titles.dayReceive}
                        data={globalStore.days}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setDayReceive(value)}
                        value={formStore.form.dayReceive}
                    />
                }
                {formStore.form.frequency.toString() === "1" &&
                    <InputDataComponent
                        label={Messages.titles.date}
                        disabled={false}
                        width="200px"
                        getValue={(value) => formStore.setInitialDate(value)}
                        viewMode={false}
                        disabledDates={[new Date(new Date().getTime() - 24 * 60 * 60 * 1000)]}
                    />
                }
            </div>

            <div className="register-member">
                {(formStore.form.frequency.toString() !== "1" && formStore.form.frequency.toString() !== "2") && formStore.form.frequency !== "" &&
                    <>
                        <DropdownSingleSelect
                            label={Messages.titles.dayReceive}
                            data={globalStore.days}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => formStore.setDayReceive(value)}
                            value={formStore.form.dayReceive}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.monthReceive}
                            data={globalStore.monthOfYear}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => formStore.setMonthReceive(value)}
                            value={formStore.form.monthReceive}
                        />
                    </>
                }

                {(formStore.form.frequency.toString() !== "1") && formStore.form.frequency !== "" &&
                    <>
                        <InputDataComponent
                            label={Messages.titles.initialDate}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setInitialDate(value)}
                            viewMode={false}
                            disabledDates={[new Date(new Date().getTime() - 24 * 60 * 60 * 1000)]}
                        />

                        <InputDataComponent
                            label={Messages.titles.finalDate}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setFinalDate(value)}
                            viewMode={false}
                            disabledDates={[new Date(new Date().getTime() - 24 * 60 * 60 * 1000)]}
                        />
                    </>
                }

            </div>


            <div className="add-button-member">
                <ButtonComponent
                    label={Messages.titles.addEntrance}
                    disabled={!formStore.form.bankId || !formStore.form.salary || !formStore.form.accountNumber || !formStore.form.type || !formStore.form.source || !formStore.form.ownerId || !formStore.form.frequency || !formStore.form.initialDate}
                    width="160px"
                    height="30px"
                    cursor="pointer"
                    borderRadius="4px"
                    color="white"
                    background="#46ba52"
                    border="none"
                    padding="2px"
                    marginBottom="20px"
                    fontWeight="400"
                    action={handleAdd}/>
            </div>

            {openModal &&
                <ModalComponent
                    openModal={openModal}
                    setOpenModal={handleClose}
                    label={Messages.titles.managementTypes}
                    getValue={editType}
                    Form={
                        <>
                            <TypeSalaryForm/>
                        </>
                    }
                    disabledSave={false}
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />
            }

            {rows.length > 0 &&
                <div className="register-member" style={{marginLeft: "18px"}}>
                    <TableComponent
                        columns={columns}
                        rows={rows}
                        pagination={false}
                        width={"100%"}
                    />
                </div>
            }

        </>
    );
}