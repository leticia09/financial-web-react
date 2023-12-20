import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import {ButtonComponent} from "../../../../components/button";
import useLoginStore from "../../../login/store/useLoginStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {TableComponent} from "../../../../components/table";
import {IColumns} from "../../../../interfaces/table";
import * as AiIcons from "react-icons/ai";
import {InputDataComponent} from "../../../../components/input-data";
import {GlobalService} from "../../../global-informtions/service";
import {Checkbox, FormControlLabel, Switch} from "@mui/material";
import useExpenseStore from "../../store/useExpenseStore";
import {InformationComponent} from "../../../../components/information";
import {ExpenseService} from "../../service";
import {Toast} from "../../../../components/toast";

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
        specificGroup: specificGroup ? specificGroup : "--",
        ownerId,
        paymentForm,
        finalCard: finalCard ? finalCard : "--",
        quantityPart: quantityPart ? quantityPart : "--",
        hasFixed: hasFixed ? "Sim" : "Não",
        dateBuy,
        obs: obs ? obs : "--",
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
    const service = ExpenseService();
    const [rows, setRows] = useState<RowType[]>([]);
    const [value, setValue] = useState('');
    const [hasSwitch, setHasSwitch] = useState(false);
    const [checked, setChecked] = useState(false);
    const [specificGroupData, setSpecificGroupData] = useState([]);
    const [cardData, setCardData] = useState([])

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
                macroGroup: globalStore.macroGroup.filter(mc => mc.id === formStore.form.macroGroup)[0].name,
                specificGroup: formStore.form.specificGroup ? globalStore.macroGroup.filter(mg => mg.id === formStore.form.macroGroup)[0].specificGroups.filter(sp => sp.id === formStore.form.specificGroup)[0].name : null,
                ownerId: formStore.form.ownerId,
                paymentForm: formStore.form.paymentForm ? globalStore.paymentForm.filter(p => p.id === formStore.form.paymentForm)[0].description : null,
                finalCard: formStore.form.finalCard ? cardData.filter(c => c.id === formStore.form.finalCard)[0].finalNumber.toString() : null,
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
            data.macroGroup,
            data.specificGroup,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            data.paymentForm,
            formStore.form.finalCard ? cardData.filter(c => c.id === formStore.form.finalCard)[0].finalNumber.toString() : null,
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
        setValue('');
        setHasSwitch(false);
    }

    const deleteItemFormList = async (i) => {
        let list = formStore.deleteItemFormList(i);

        const transformedRows = list.map((data: any, index: number) => createData(
            data.local,
            globalStore.macroGroup.filter((mg => mg.id === data.macroGroup))[0].name,
            data.specificGroup ? globalStore.macroGroup.filter(mg => mg.id === data.macroGroup)[0].specificGroups.filter(sp => sp.id === data.specificGroup)[0].name : null,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            data.paymentForm ? globalStore.paymentForm.filter(p => p.id === data.paymentForm)[0].description : null,
            formStore.form.finalCard ? cardData.filter(c => c.id === formStore.form.finalCard)[0].finalNumber.toString() : null,
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
        setValue('');
        setHasSwitch(false);
    }

    const handleOwner = (value) => {
        formStore.setOwnerId(value);
        setCardData(getCards(value));
    }

    const getCards = (value) => {
        let cardList = [];
        globalStore.bank.filter(ba => {
            ba.accounts.filter(ac => {
                if (ac.owner === value) {
                    ac.cards.forEach(ca => {
                        cardList.push({
                            id: ca.id,
                            finalNumber: ca.finalNumber,
                            description: ca.name + "/ " + ca.finalNumber,
                            modality: ca.modality
                        });
                    })
                }
            })
        });
        return cardList;
    }

    const handleChangeSwitch = (event) => {
        setHasSwitch(event.target.checked);
        if (event.target.checked) {
            let index = formStore.formList.length - 1;
            formStore.setLocal(formStore.formList[index].local);
            formStore.setMacroGroup(formStore.formList[index].macroGroup);
            formStore.setSpecificGroup(formStore.formList[index].specificGroup);
            formStore.setOwnerId(formStore.formList[index].ownerId);
            formStore.setPaymentForm(formStore.formList[index].paymentForm);
            formStore.setFinalCard(formStore.formList[index].finalCard);
            formStore.setQuantityPart(formStore.formList[index].quantityPart);
            formStore.setHasFixed(formStore.formList[index].hasFixed);
            formStore.setDateBuy(formStore.formList[index].dateBuy);
            formStore.setObs(formStore.formList[index].obs);
            formStore.setValue(formStore.formList[index].value);
            formStore.setUserAuthId(loginStore.userId);
            setValue(formStore.formList[index].value.toString());
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

    const handleValue = (value) => {
        setValue(value);
        formStore.setValue(value);
    }

    const handlePayment = (value) => {
        formStore.setPaymentForm(value);
        const payment = globalStore.paymentForm.filter(p => p.id === value)[0].description;
        const card = getCards(formStore.form.ownerId);
        const cardFiltered = card.filter(ca => ca.modality.includes(payment));
        setCardData(cardFiltered);

        if (value === 2) {
            setOpenToast(true);
        }
    }

    const handleCloseToast = () => {
        setOpenToast(false);
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
                    disabled={!formStore.form.ownerId}
                    width={"210px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => handlePayment(value)}
                    value={formStore.form.paymentForm}
                />

                {(formStore.form.paymentForm.toString() === "2" || formStore.form.paymentForm.toString() === "3") &&
                    <DropdownSingleSelect
                        label={Messages.titles.finalCard}
                        data={cardData}
                        disabled={!formStore.form.paymentForm}
                        width={"210px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setFinalCard(value)}
                        value={formStore.form.finalCard}
                    />

                }

                {(formStore.form.paymentForm.toString() === "3") &&
                    <Input
                        label={Messages.titles.quantityPart}
                        disabled={false}
                        width="210px"
                        getValue={(value) => formStore.setQuantityPart(value)}
                        inputValue={formStore.form.quantityPart}
                    />
                }

                <Input
                    label={Messages.titles.totalValue}
                    disabled={false}
                    width="210px"
                    maskNumeric={true}
                    getValue={(value) => handleValue(value)}
                    inputValue={value}
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
            <Toast
                severity={"info"}
                width="100%"
                duration={4000}
                message={
                    <>
                        Ao salvar uma despesa com a forma de pagamento Débito
                        <br/>
                        será debitado de sua conta o valor automaticamente.
                    </>
                }
                open={openToast}
                onClose={handleCloseToast}
            />

        </>
    );
}