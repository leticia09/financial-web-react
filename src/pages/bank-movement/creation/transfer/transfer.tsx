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
import {getMonth, getYear, isAfter} from "date-fns";
import {EntranceService} from "../../../entrance/service";
import movementBankStore from "../../store";
import {GlobalService} from "../../../global-informtions/service";
import {Checkbox, FormControlLabel} from "@mui/material";
import {InformationComponent} from "../../../../components/information";
import {Toast} from "../../../../components/toast";

const columns: IColumns[] = [
    {
        id: "ownerOriginId",
        label: "Titular Origem",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "bankOriginId",
        label: "Banco Origem",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "accountOriginId",
        label: "Conta Origem",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "ownerDestinyId",
        label: "Titular Destino",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "bankDestinyId",
        label: "Banco Destino",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "accountDestinyId",
        label: "Conta Destino",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "receiver",
        label: "Receptor",
        minWidth: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "value",
        label: "Valor Trasferência",
        minWidth: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "dateTransfer",
        label: "Data Trasferência",
        minWidth: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "obs",
        label: "Observação",
        minWidth: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "actions",
        label: "Ações",
        minWidth: 70,
        width: 30,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];

function createData(bankOriginId, bankDestinyId, ownerOriginId, ownerDestinyId, accountOriginId, accountDestinyId, receiver, value, dateTransfer, obs, actions, index) {
    return {
        bankOriginId,
        bankDestinyId,
        ownerOriginId,
        ownerDestinyId,
        accountOriginId,
        accountDestinyId,
        receiver,
        value,
        dateTransfer,
        obs,
        actions,
        index
    };
}

type RowType = {
    bankOriginId: number
    bankDestinyId: number;
    ownerOriginId: number;
    ownerDestinyId: number;
    accountOriginId: number;
    accountDestinyId: number;
    receiver: string;
    value: string;
    dateTransfer: string;
    obs: string;
    actions: React.ReactNode[];
    index: number;
};

export const TransferForm: FunctionComponent = () => {
        const formStore = movementBankStore();
        const globalStore = useGlobalStore();
        const [checked, setChecked] = useState(false);
        const [accountDataOrigin, setAccountDataOrigin] = useState([]);
        const [accountDataDestiny, setAccountDataDestiny] = useState([]);
        const [notHaveMoney, setNotHaveMoeny] = useState(false);

        const [rows, setRows] = useState<RowType[]>([]);

        const actions = (index) => (
            <div style={{width: "50%", display: "flex"}}>
                <AiIcons.AiOutlineDelete style={{marginLeft: "6px"}} className="icon_delete" size={18}
                                         onClick={() => deleteItemFormList(index)}/>
            </div>
        );

        useEffect(() => {
            formStore.setFormListTransfer([]);
            formStore.resetFormStoreTransfer();
        }, []);


        const handleAdd = () => {
            const updateList = [...formStore.formListTransfer];
            updateList.push(
                {
                    bankOriginId: formStore.formTransfer.bankOriginId,
                    bankDestinyId: formStore.formTransfer.bankDestinyId,
                    ownerOriginId: formStore.formTransfer.ownerOriginId,
                    ownerDestinyId: formStore.formTransfer.ownerDestinyId,
                    accountOriginId: formStore.formTransfer.accountOriginId,
                    accountDestinyId: formStore.formTransfer.accountDestinyId,
                    receiver: formStore.formTransfer.receiver,
                    value: formStore.formTransfer.value,
                    dateTransfer: formStore.formTransfer.dateTransfer,
                    obs: formStore.formTransfer.obs,
                }
            )
            formStore.setFormListTransfer(updateList);
            const transformedRows = updateList.map((data: any, index: number) => createData(
                data.bankOriginId ? globalStore.bank.filter(mem => mem.id === data.bankOriginId)[0].name : "--",
                data.bankDestinyId ? globalStore.bank.filter(mem => mem.id === data.bankDestinyId)[0].name : "--",
                data.ownerOriginId ? globalStore.members.filter(mem => mem.id === data.ownerOriginId)[0].name : "--",
                data.ownerDestinyId ? globalStore.members.filter(mem => mem.id === data.ownerDestinyId)[0].name : "--",
                data.accountOriginId ? accountDataOrigin.filter(ac => ac.id === data.accountOriginId)[0].accountNumber : "--",
                data.accountDestinyId ? accountDataDestiny.filter(ac => ac.id === data.accountDestinyId)[0].accountNumber : "--",
                data.receiver ? data.receiver : "--",
                data.value,
                data.dateTransfer,
                data.obs,
                actions(index),
                index
            ));
            setRows(transformedRows);
            reset();
        }

        const deleteItemFormList = async (i) => {
            let list = formStore.deleteItemFormList(i);

            const transformedRows = list.map((data: any, index: number) => createData(
                globalStore.bank.filter(mem => mem.id === data.bankOriginId)[0].name,
                globalStore.bank.filter(mem => mem.id === data.bankDestinyId)[0].name,
                globalStore.members.filter(mem => mem.id === data.ownerOriginId)[0].name,
                globalStore.members.filter(mem => mem.id === data.ownerDestinyId)[0].name,
                accountDataOrigin.filter(ac => ac.id === data.accountOriginId)[0].accountNumber,
                accountDataDestiny.filter(ac => ac.id === data.accountDestinyId)[0].accountNumber,
                data.receiver ? data.receiver : "--",
                data.value,
                data.dateTransfer,
                data.obs,
                actions(index),
                index
            ));
            setRows(transformedRows);
        }

        const reset = () => {
            formStore.resetFormStoreTransfer();
        }


        const handleChecked = (event) => {
            setChecked(event.target.checked);
        };

        const handleBankOrigin = (value) => {
            formStore.setBankOriginId(value);
            const accounts = globalStore.bank.filter(b => b.id === value)[0].accounts;
            setAccountDataOrigin(accounts.filter(ac => ac.owner.toString() === formStore.formTransfer.ownerOriginId.toString()));
        }

        const handleBankDestiny = (value) => {
            formStore.setBankDestinyId(value);
            const accounts = globalStore.bank.filter(b => b.id === value)[0].accounts;
            setAccountDataDestiny(accounts.filter(ac => ac.owner.toString() === formStore.formTransfer.ownerDestinyId.toString()));
        }

        const handleValue = (value) => {
            formStore.setValue(value);
            const accountValue = accountDataOrigin.filter(ac => ac.id === formStore.formTransfer.accountOriginId)[0].value;
            value > accountValue ? setNotHaveMoeny(true) : setNotHaveMoeny(false);
        }

        const handleCloseToastWarning = () => {
            setNotHaveMoeny(false);
        };

        return (
            <div>
                <div>
                    <div className="register-member">
                        <FormControlLabel style={{marginLeft: "2px"}}
                                          control={
                                              <Checkbox
                                                  checked={checked}
                                                  onChange={handleChecked}
                                                  color="primary"
                                              />
                                          }
                                          label={Messages.titles.external}
                        />
                        <InformationComponent message={Messages.messages.externalInfo}/>
                    </div>
                    <div className="register-member">
                        <DropdownSingleSelect
                            label={Messages.titles.ownerOrigin}
                            data={globalStore.members}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"name"}
                            getValue={(value) => formStore.setOwnerOriginId(value)}
                            value={formStore.formTransfer.ownerOriginId}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.bankOrigin}
                            data={globalStore.bank}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"name"}
                            getValue={(value) => handleBankOrigin(value)}
                            value={formStore.formTransfer.bankOriginId}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.accountOrigin}
                            data={accountDataOrigin}
                            disabled={!formStore.formTransfer.bankOriginId}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"accountNumber"}
                            getValue={(value) => formStore.setAccountOriginId(value)}
                            value={formStore.formTransfer.accountOriginId}
                        />


                        {checked &&
                            <Input
                                label={Messages.titles.responsible}
                                disabled={false}
                                width="200px"
                                getValue={(value) => formStore.setReceiver(value)}
                                inputValue={formStore.formTransfer.receiver}
                                viewMode={false}
                                maskDate={false}
                                numericLimit={55}
                            />
                        }

                    </div>

                    {!checked &&
                        <div className="register-member">
                            <DropdownSingleSelect
                                label={Messages.titles.ownerDestiny}
                                data={globalStore.members}
                                disabled={false}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"name"}
                                getValue={(value) => formStore.setOwnerDestinyId(value)}
                                value={formStore.formTransfer.ownerDestinyId}
                            />
                            <DropdownSingleSelect
                                label={Messages.titles.bankDestiny}
                                data={globalStore.bank}
                                disabled={false}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"name"}
                                getValue={(value) => handleBankDestiny(value)}
                                value={formStore.formTransfer.bankDestinyId}
                            />
                            <DropdownSingleSelect
                                label={Messages.titles.accountDestiny}
                                data={accountDataDestiny}
                                disabled={!formStore.formTransfer.bankDestinyId}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"accountNumber"}
                                getValue={(value) => formStore.setAccountDestinyId(value)}
                                value={formStore.formTransfer.accountDestinyId}
                            />
                        </div>
                    }

                    <div className="register-member">

                        <Input
                            label={Messages.titles.currentValue}
                            disabled={!formStore.formTransfer.accountOriginId}
                            width="200px"
                            getValue={(value) => handleValue(value)}
                            inputValue={formStore.formTransfer.value}
                            viewMode={false}
                            price={true}
                        />

                        <InputDataComponent
                            label={Messages.titles.dateTransfer}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setDateTransfer(value)}
                            viewMode={false}
                            inputValue={formStore.formTransfer.dateTransfer}
                            disabledDates={[new Date()]}
                            before={true}
                        />

                        <Input
                            label={Messages.titles.obs}
                            disabled={false}
                            width="418px"
                            getValue={(value) => formStore.setObsTransfer(value)}
                            inputValue={formStore.formTransfer.obs}
                            viewMode={false}
                            maskDate={false}
                            numericLimit={55}
                        />
                    </div>
                    <div className="register-member">
                        <div className="add-button-member">
                            <ButtonComponent
                                label={"+ " + Messages.titles.transfer_}
                                disabled={notHaveMoney || !formStore.formTransfer.ownerOriginId || !formStore.formTransfer.bankOriginId || !formStore.formTransfer.accountOriginId || !formStore.formTransfer.value || !formStore.formTransfer.dateTransfer}
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
                    severity={"warning"}
                    width="100%"
                    duration={4000}
                    message={"Saldo Insuficiente!"}
                    open={notHaveMoney}
                    onClose={handleCloseToastWarning}
                />
            </div>
        );
    }
;
