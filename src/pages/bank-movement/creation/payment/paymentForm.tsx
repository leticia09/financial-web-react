import React, {FunctionComponent, useEffect, useState} from "react";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import {InputDataComponent} from "../../../../components/input-data";
import useLoginStore from "../../../login/store/useLoginStore";
import {ButtonComponent} from "../../../../components/button";
import {TableComponent} from "../../../../components/table";
import {IColumns} from "../../../../interfaces/table";
import * as AiIcons from "react-icons/ai";
import {getMonth, getYear} from "date-fns";
import movementBankStore from "../../store";
import {GlobalService} from "../../../global-informtions/service";
import {DropdownMultiSelect} from "../../../../components/dropdown/dropdownMultiselect";
import {MovementBankService} from "../../service";
import {ExpenseService} from "../../../expense/service";

const columns: IColumns[] = [
    {
        id: "ownerId",
        label: "Titular",
    },
    {
        id: "expenseId",
        label: "Despesa",
    },
    {
        id: "bankId",
        label: "Banco",
    },
    {
        id: "accountId",
        label: "Conta",
    },
    {
        id: "value",
        label: "Valor",
    },

    {
        id: "paymentDate",
        label: "Data Pagamento",
    },
    {
        id: "referencePeriod",
        label: "Período Referência",
    },
    {
        id: "obs",
        label: "Observação",
    },
    {
        id: "actions",
        label: "Ações",
    },
];

function createData(expenseId, paymentDate, referencePeriod, value, ownerId, obs, actions, index) {
    return {expenseId, paymentDate, referencePeriod, value, ownerId, obs, actions, index};
}

type RowType = {
    expenseId: number;
    paymentDate: string;
    referencePeriod: string;
    value: string;
    ownerId: number;
    obs: string;
    actions: React.ReactNode[];
    index: number;
};

export const PaymentForm: FunctionComponent = () => {
        const formStore = movementBankStore();
        const loginStore = useLoginStore();
        const globalStore = useGlobalStore();
        const globalService = GlobalService();
        const movementService = MovementBankService();
        const service = ExpenseService();
        const [rows, setRows] = useState<RowType[]>([]);
        const [paymentRefer, setPaymentRefer] = useState("");
        const [salary, setSalary] = useState("");
        const [expenseData, setExpenseData] = useState(globalStore.expense);
        const [currency, setCurrency] = useState([]);
        const [type, setType] = useState(0);
        const [accountData, setAccountData] = useState([]);
        const [cardData, setCardData] = useState([]);

        const actions = (index) => (
            <div style={{width: "50%", display: "flex"}}>
                <AiIcons.AiOutlineDelete style={{marginLeft: "6px"}} className="icon_delete" size={18}
                                         onClick={() => deleteItemFormList(index)}/>
            </div>
        );

        useEffect(() => {
            setPaymentRefer(getCurrentMonthYear());
            formStore.setFormListPayment([]);
            formStore.resetFormStorePayment();
            formStore.setReferencePeriodPayment(getCurrentMonthYear());
        }, []);

        const getCurrentMonthYear = () => {
            const currentDate = new Date();
            const month = getMonth(currentDate) + 1;
            const year = getYear(currentDate);

            return `${String(month).padStart(2, '0')}/${year}`;
        };

        const handleAdd = () => {
            const updateList = [...formStore.formListPayment];
            if (type === 1 || type === 2) {
                updateList.push(
                    {
                        expenseId: formStore.formPayment.expenseId,
                        paymentDate: formStore.formPayment.paymentDate,
                        referencePeriod: formStore.formPayment.referencePeriod,
                        value: formStore.formPayment.value,
                        ownerId: formStore.formPayment.ownerId,
                        obs: formStore.formPayment.obs,
                    }
                )
                formStore.setFormListPayment(updateList);
                const transformedRows = updateList.map((data: any, index: number) => createData(
                    data.expenseId ? expenseData.filter(ex => ex.id === data.expenseId)[0].local : "--",
                    data.paymentDate,
                    data.referencePeriod ? data.referencePeriod : "--",
                    expenseData.filter(ex => ex.id === data.expenseId)[0].currency + " " + data.value,
                    globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
                    data.obs ? data.obs : "--",
                    actions(index),
                    index
                ));
                setRows(transformedRows);
                reset();
            }

        }

        const deleteItemFormList = async (i) => {
            let list = formStore.deleteItemFormListPayment(i);
            if (type === 1  || type === 2) {
                const transformedRows = list.map((data: any, index: number) => createData(
                    data.expenseId ? expenseData.filter(ex => ex.id === data.expenseId)[0].local : "--",
                    data.paymentDate,
                    data.referencePeriod ? data.referencePeriod : "--",
                    expenseData.filter(ex => ex.id === data.expenseId)[0].currency + " " + data.value,
                    globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
                    data.obs ? data.obs : "--",
                    actions(index),
                    index
                ));
                setRows(transformedRows);
            }
        }

        const reset = () => {
            setPaymentRefer(getCurrentMonthYear());
            setSalary("");
            formStore.resetFormStorePayment();
        }

        const handlePaymentRefer = (value) => {
            setPaymentRefer(value);
            formStore.setReferencePeriodPayment(value);
        }

        const handleSalary = (value) => {
            if (value.includes(currency + ' ')) {
                setSalary(value);
                formStore.setValuePayment(value);
            }
        }

        const handleOwner = (value) => {
            formStore.setOwnerIdPayment(value);
        }

        const handleBank = (value) => {
            formStore.setBankId(value);
            const accounts = globalStore.bank.filter(b => b.id === value)[0].accounts;
            setAccountData(accounts.filter(a => a.owner.toString() === formStore.form.ownerId.toString()));
        }

        const handleType = async (value) => {
            if (value === 1) {
                const res = await service.getFixed(loginStore.userId);
                setExpenseData(res.data)
            }
            if (value === 2) {
                const res = await service.getSplit(loginStore.userId);
                setExpenseData(res.data)
            }

            setType(value);
        }

        const handleAccount = (value) => {
            formStore.setAccountId(value);
            let cards = accountData.filter(ac => ac.id === value)[0].cards;
            let list = [];
            cards.forEach(c => {
                list.push({id: c.finalNumber, description: c.name + " / " + c.finalNumber})
            });
            setCardData(list);
        }

        const handleCard = async (value) => {
            let cardList = [];
            value.forEach(v => {
                    cardList.push(cardData.filter(c => c.description === v)[0].id)
                }
            )
            const response = await movementService.getValueAmount(loginStore.userId, formStore.form.bankId, formStore.form.accountId, cardList);
        }

        const handleExpense = (event) => {
            formStore.setExpenseId(event);
            const expenseValue = expenseData.filter(ex => ex.id === event)[0];
            let value = 0;
            expenseValue.hasSplitExpense ? value = expenseValue.value / expenseValue.quantityPart : value = expenseValue.value.toString().replace(".", ",");
            formStore.setValuePayment(value.toString());
        }
        return (
            <div>
                <div>
                    <div className="register-member">
                        <DropdownSingleSelect
                            label={Messages.titles.typeOfEntrance}
                            data={globalStore.paymentTypes}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => handleType(value)}
                            value={type}
                        />
                    </div>
                    {type === 1 &&
                        <>
                            <div className="register-member">
                                <DropdownSingleSelect
                                    label={Messages.titles.owner}
                                    data={globalStore.members}
                                    disabled={false}
                                    width={"200px"}
                                    idProperty={"id"}
                                    descriptionProperty={"name"}
                                    getValue={(value) => handleOwner(value)}
                                    value={formStore.formPayment.ownerId}
                                />
                                {expenseData && expenseData.length > 0 &&
                                    <DropdownSingleSelect
                                        label={Messages.titles.expense_}
                                        data={expenseData}
                                        disabled={!formStore.formPayment.ownerId}
                                        width={"200px"}
                                        idProperty={"id"}
                                        descriptionProperty={"local"}
                                        getValue={(value) => handleExpense(value)}
                                        value={formStore.formPayment.expenseId}
                                    />}

                                <Input
                                    label={Messages.titles.currentValue}
                                    disabled={!formStore.formPayment.expenseId}
                                    width="200px"
                                    getValue={(value) => formStore.setValuePayment(value)}
                                    inputValue={formStore.formPayment.value}
                                    viewMode={false}
                                    price={true}
                                />
                                <InputDataComponent
                                    label={Messages.titles.datePayment}
                                    disabled={false}
                                    width="200px"
                                    getValue={(value) => formStore.setPaymentDate(value)}
                                    viewMode={false}
                                    inputValue={formStore.formPayment.paymentDate}
                                    disabledDates={[new Date()]}
                                    before={true}
                                />
                            </div>
                            <div className="register-member">
                                <Input
                                    label={Messages.titles.paymentRefer}
                                    disabled={false}
                                    width="200px"
                                    getValue={(value) => handlePaymentRefer(value)}
                                    inputValue={paymentRefer}
                                    viewMode={false}
                                    maskDate={true}
                                    numericLimit={7}
                                />
                                <Input
                                    label={Messages.titles.obs}
                                    disabled={false}
                                    width="418px"
                                    getValue={(value) => formStore.setObsPayment(value)}
                                    inputValue={formStore.formPayment.obs}
                                    viewMode={false}
                                    maskDate={false}
                                    numericLimit={55}
                                />
                            </div>
                            <div className="register-member">
                                <div className="add-button-member">
                                    <ButtonComponent
                                        label={"+ " + Messages.titles.transfer_}
                                        disabled={!formStore.formPayment.value || !formStore.formPayment.paymentDate || !formStore.formPayment.ownerId || !formStore.formPayment.expenseId}
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
                            </div>
                        </>
                    }

                    {type === 2 &&
                        <>
                            <div className="register-member">
                                <DropdownSingleSelect
                                    label={Messages.titles.owner}
                                    data={globalStore.members}
                                    disabled={false}
                                    width={"200px"}
                                    idProperty={"id"}
                                    descriptionProperty={"name"}
                                    getValue={(value) => handleOwner(value)}
                                    value={formStore.formPayment.ownerId}
                                />
                                {expenseData && expenseData.length > 0 &&
                                    <DropdownSingleSelect
                                        label={Messages.titles.expense_}
                                        data={expenseData}
                                        disabled={!formStore.formPayment.ownerId}
                                        width={"200px"}
                                        idProperty={"id"}
                                        descriptionProperty={"local"}
                                        getValue={(value) => handleExpense(value)}
                                        value={formStore.formPayment.expenseId}
                                    />}

                                <Input
                                    label={Messages.titles.partValue}
                                    disabled={!formStore.formPayment.expenseId}
                                    width="200px"
                                    getValue={(value) => formStore.setValuePayment(value)}
                                    inputValue={formStore.formPayment.value}
                                    viewMode={false}
                                    price={true}
                                />
                                <InputDataComponent
                                    label={Messages.titles.datePayment}
                                    disabled={false}
                                    width="200px"
                                    getValue={(value) => formStore.setPaymentDate(value)}
                                    viewMode={false}
                                    inputValue={formStore.formPayment.paymentDate}
                                    disabledDates={[new Date()]}
                                    before={true}
                                />
                            </div>
                            <div className="register-member">
                                <Input
                                    label={Messages.titles.paymentRefer}
                                    disabled={false}
                                    width="200px"
                                    getValue={(value) => handlePaymentRefer(value)}
                                    inputValue={paymentRefer}
                                    viewMode={false}
                                    maskDate={true}
                                    numericLimit={7}
                                />
                                <Input
                                    label={Messages.titles.obs}
                                    disabled={false}
                                    width="418px"
                                    getValue={(value) => formStore.setObsPayment(value)}
                                    inputValue={formStore.formPayment.obs}
                                    viewMode={false}
                                    maskDate={false}
                                    numericLimit={55}
                                />
                            </div>
                            <div className="register-member">
                                <div className="add-button-member">
                                    <ButtonComponent
                                        label={"+ " + Messages.titles.addPayment}
                                        disabled={!formStore.formPayment.value || !formStore.formPayment.paymentDate || !formStore.formPayment.ownerId || !formStore.formPayment.expenseId}
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
                            </div>
                        </>
                    }

                    {type === 3 &&
                        <>
                            <div className="register-member">
                                <DropdownSingleSelect
                                    label={Messages.titles.owner}
                                    data={globalStore.members}
                                    disabled={false}
                                    width={"200px"}
                                    idProperty={"id"}
                                    descriptionProperty={"name"}
                                    getValue={(value) => handleOwner(value)}
                                    value={formStore.form.ownerId}
                                />
                                <DropdownSingleSelect
                                    label={Messages.titles.bank}
                                    data={globalStore.bank}
                                    disabled={!formStore.form.ownerId}
                                    width={"200px"}
                                    idProperty={"id"}
                                    descriptionProperty={"name"}
                                    getValue={(value) => handleBank(value)}
                                    value={formStore.form.entrance}
                                />

                                <DropdownSingleSelect
                                    label={Messages.titles.account}
                                    data={accountData}
                                    disabled={!formStore.form.ownerId}
                                    width={"200px"}
                                    idProperty={"id"}
                                    descriptionProperty={"accountNumber"}
                                    getValue={(value) => handleAccount(value)}
                                    value={formStore.form.entrance}
                                />

                                <DropdownMultiSelect
                                    label={Messages.titles.card}
                                    data={cardData}
                                    disabled={!formStore.form.ownerId}
                                    width={"200px"}
                                    idProperty={"id"}
                                    descriptionProperty={"description"}
                                    getValue={(value) => handleCard(value)}
                                    value={[]}
                                />

                            </div>
                            <div className="register-member">
                                <Input
                                    label={Messages.titles.amountValue}
                                    disabled={!formStore.form.entrance}
                                    width="200px"
                                    getValue={(value) => handleSalary(value)}
                                    inputValue={salary}
                                    viewMode={false}
                                    price={true}
                                />

                                <InputDataComponent
                                    label={Messages.titles.dateReceive}
                                    disabled={false}
                                    width="200px"
                                    getValue={(value) => formStore.setReceiveDate(value)}
                                    viewMode={false}
                                    inputValue={formStore.form.receiveDate}
                                    disabledDates={[new Date()]}
                                    before={true}
                                />
                                <Input
                                    label={Messages.titles.paymentRefer}
                                    disabled={false}
                                    width="200px"
                                    getValue={(value) => handlePaymentRefer(value)}
                                    inputValue={paymentRefer}
                                    viewMode={false}
                                    maskDate={true}
                                    numericLimit={7}
                                />
                                <Input
                                    label={Messages.titles.obs}
                                    disabled={false}
                                    width="418px"
                                    getValue={(value) => formStore.setObs(value)}
                                    inputValue={formStore.form.obs}
                                    viewMode={false}
                                    maskDate={false}
                                    numericLimit={55}
                                />
                            </div>
                            <div className="register-member">
                                <div className="add-button-member">
                                    <ButtonComponent
                                        label={"+ " + Messages.titles.receive}
                                        disabled={!formStore.form.entrance || !formStore.form.salary || !formStore.form.receiveDate || !formStore.form.ownerId}
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
                            </div>
                        </>
                    }


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

            </div>
        );
    }
;
