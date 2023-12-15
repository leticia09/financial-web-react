import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import {ButtonComponent} from "../../../../components/button";
import useLoginStore from "../../../login/store/useLoginStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {EntranceService} from "../../service";
import {TableComponent} from "../../../../components/table";
import {IColumns} from "../../../../interfaces/table";
import * as AiIcons from "react-icons/ai";
import {InputDataComponent} from "../../../../components/input-data";
import {GlobalService} from "../../../global-informtions/service";
import {Checkbox, FormControlLabel, Switch} from "@mui/material";
import useExpenseStore from "../../store/useExpenseStore";
import {InformationComponent} from "../../../../components/information";
import _default from "chart.js/dist/plugins/plugin.tooltip";

const columns: IColumns[] = [
    {
        id: "ownerId",
        label: "Responsável",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "local",
        label: "Local",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "macroGroup",
        label: "Grupo Macro",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "specificGroup",
        label: "Grupo Específico",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "paymentForm",
        label: "Forma de Pagamento",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "finalCard",
        label: "Final Cartão",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "quantityPart",
        label: "Qtdd. Parcelas",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "hasFixed",
        label: "Despesa Fixa",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dateBuy",
        label: "Data da Compra",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "value",
        label: "Valor",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "obs",
        label: "Observação",
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

function createData(local, macroGroup, specificGroup, ownerId, paymentForm, finalCard, quantityPart, hasFixed, dateBuy, obs, value, actions, index) {
    return {
        local,
        macroGroup,
        specificGroup : specificGroup? specificGroup : "--",
        ownerId,
        paymentForm,
        finalCard: finalCard? finalCard: "--",
        quantityPart: quantityPart? quantityPart : "--",
        hasFixed: hasFixed ? "Sim" : "Não",
        dateBuy,
        obs: obs? obs : "--",
        value,
        actions,
        index
    };
}

type RowType = {
    local: string;
    macroGroup: string;
    specificGroup?: string;
    ownerId: number;
    paymentForm: string;
    finalCard?: number;
    quantityPart?: number;
    hasFixed: string;
    dateBuy: string;
    obs?: string;
    value: number;
    actions: React.ReactNode[];
    index: number;
};

export const ExpenseForm: FunctionComponent = () => {

    const formStore = useExpenseStore();
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const globalService = GlobalService();
    const [openModal, setOpenModal] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const service = EntranceService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [openWarningToast, setOpenWarningToast] = useState(false);
    const [hasSwitch, setHasSwitch] = useState(false);
    const [checked, setChecked] = useState(false);
    const [specificGroupData, setSpecificGroupData] = useState([]);

    const actions = (index) => (
        <div style={{width: "50%", display: "flex"}}>
            <AiIcons.AiOutlineDelete style={{marginLeft: "6px"}} className="icon_delete" size={18}
                                     onClick={() => deleteItemFormList(index)}/>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            const groupResponse = await globalService.getGroups(loginStore.userId);
            globalStore.setMacroGroup(groupResponse.data.data);

            const bankResponse = await globalService.getBank(loginStore.userId);
            globalStore.setBank(bankResponse.data.data);
        };
        fetchData();

        formStore.resetFormStore();

    }, []);

    const handleAdd = () => {
        const updateList = [...formStore.formList];
        updateList.push(
            {
                local: formStore.form.local,
                macroGroup: formStore.form.macroGroup,
                specificGroup: formStore.form.specificGroup ? formStore.form.specificGroup : null,
                ownerId: formStore.form.ownerId,
                paymentForm: formStore.form.paymentForm,
                finalCard: formStore.form.finalCard ? formStore.form.finalCard : null,
                quantityPart: formStore.form.quantityPart ? formStore.form.quantityPart : null,
                hasFixed: formStore.form.hasFixed,
                dateBuy: formStore.form.dateBuy,
                obs: formStore.form.obs,
                value: formStore.form.value,
                userAuthId: loginStore.userId,
                index: updateList.length,
            }
        )
        formStore.setFormList(updateList);
        const transformedRows = updateList.map((data: any, index: number) => createData(
            data.local,
            globalStore.macroGroup.filter((mg=> mg.id === data.macroGroup))[0].name,
            data.specificGroup ? specificGroupData.filter(sp=> sp.id === data.specificGroup)[0].name : null,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            data.paymentForm,
            data.finalCard,
            data.quantityPart,
            data.hasFixed,
            data.dateBuy,
            data.obs,
            data.value,
            actions(index),
            index
        ));
        setRows(transformedRows);
        formStore.resetForm();
        setHasSwitch(false);
    }

    const deleteItemFormList = async (i) => {
        let list = formStore.deleteItemFormList(i);

        const transformedRows = list.map((data: any, index: number) => createData(
            data.source,
            data.type,
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

    const handleOwner = (value) => {
        formStore.setOwnerId(value);
    }


    const handleChangeSwitch = (event) => {
        setHasSwitch(event.target.checked);
        if (event.target.checked) {
            // let index = formStore.formList.length - 1;
            // formStore.setType(typeSalaryData.filter(fi=> fi.description === formStore.formList[index].type)[0].id);
            // formStore.setOwnerId(formStore.formList[index].ownerId);
            // formStore.setBankId(formStore.formList[index].bankId);
            // formStore.setAccountNumber(formStore.formList[index].accountNumber);
            // formStore.setUserAuthId(formStore.formList[index].userAuthId);
            // formStore.setFrequency(globalStore.frequency.filter(fr=> fr.description === formStore.formList[index].frequency)[0].id);
            // formStore.setInitialDate(formStore.formList[index].initialDate);
            // formStore.setFinalDate(formStore.formList[index].finalDate);
            // formStore.setMonthReceive(formStore.formList[index].monthReceive);
            // formStore.setDayReceive(formStore.formList[index].dayReceive);
            // formStore.setSalary(formStore.formList[index].salary);
            // setSalary(formStore.formList[index].salary.toString())
        }
        setHasSwitch(!hasSwitch);
    }

    const handleChecked = (event) => {
        formStore.setHasFixed(event.target.checked)
        setChecked(event.target.checked);
    };

    const handleMacroGroup = (event) => {
        formStore.setMacroGroup(event);
        const specific = globalStore.macroGroup.filter(mg => mg.id === event)[0].specificGroups
        setSpecificGroupData(specific);
    }

    return (
        <>
            <div className="register-member">
                <DropdownSingleSelect
                    label={Messages.titles.owner}
                    data={globalStore.members}
                    disabled={false}
                    width={"210px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => handleOwner(value)}
                    value={formStore.form.ownerId}
                />

                <Input
                    label={Messages.titles.local}
                    disabled={false}
                    width="210px"
                    getValue={(value) => formStore.setLocal(value)}
                    inputValue={formStore.form.local}
                />

                <DropdownSingleSelect
                    label={Messages.titles.macroGroup}
                    data={globalStore.macroGroup}
                    disabled={false}
                    width={"210px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => handleMacroGroup(value)}
                    value={formStore.form.macroGroup}
                />

                <DropdownSingleSelect
                    label={Messages.titles.specificGroup}
                    data={specificGroupData}
                    disabled={!formStore.form.macroGroup}
                    width={"210px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => formStore.setSpecificGroup(value)}
                    value={formStore.form.specificGroup}
                />

            </div>
            <div className="register-member">
                <DropdownSingleSelect
                    label={Messages.titles.paymentForm}
                    data={globalStore.paymentForm}
                    disabled={false}
                    width={"210px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => formStore.setPaymentForm(value)}
                    value={formStore.form.paymentForm}
                />

                {(formStore.form.paymentForm.toString() === "2" || formStore.form.paymentForm.toString() === "3") &&
                    <DropdownSingleSelect
                        label={Messages.titles.finalCard}
                        data={[]}
                        disabled={false}
                        width={"210px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => formStore.setFinalCard(value)}
                        value={formStore.form.finalCard}
                    />

                }

                {(formStore.form.paymentForm.toString() === "2" || formStore.form.paymentForm.toString() === "3") &&
                    <Input
                        label={Messages.titles.quantityPart}
                        disabled={false}
                        width="210px"
                        getValue={(value) => formStore.setQuantityPart(value)}
                        inputValue={formStore.form.quantityPart}
                    />
                }

                <Input
                    label={Messages.titles.currentValue}
                    disabled={false}
                    width="210px"
                    maskNumeric={true}
                    getValue={(value) => formStore.setValue(value)}
                    inputValue={formStore.form.value}
                />
            </div>

            <div className="register-member">


                <InputDataComponent
                    label={Messages.titles.dateBuy}
                    disabled={false}
                    width="210px"
                    getValue={(value) => formStore.setDateBuy(value)}
                    viewMode={false}
                    disabledDates={null}
                    after={true}
                />
                <FormControlLabel style={{marginLeft: "2px"}}
                                  control={
                                      <Checkbox
                                          checked={checked}
                                          onChange={handleChecked}
                                          color="primary"
                                      />
                                  }
                                  label={Messages.titles.hasFixed}
                />
                <InformationComponent message={Messages.messages.expenseInfo}/>
            </div>

            <div className="register-member">
                <Input
                    label={Messages.titles.obs}
                    disabled={false}
                    width="426px"
                    maskNumeric={true}
                    getValue={(value) => formStore.setObs(value)}
                    inputValue={formStore.form.obs}
                />
            </div>


            <div className="add-button-member">
                <ButtonComponent
                    label={Messages.titles.addExpense}
                    disabled={!formStore.form.local || !formStore.form.macroGroup || !formStore.form.paymentForm || !formStore.form.value || !formStore.form.dateBuy || !formStore.form.ownerId}
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

                <FormControlLabel style={{marginLeft: "12px"}}
                                  control={
                                      <Switch
                                          disabled={formStore.formList.length === 0}
                                          checked={hasSwitch}
                                          onChange={handleChangeSwitch}
                                          name="gilad"/>
                                  }
                                  label={Messages.titles.copy}
                />
            </div>


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