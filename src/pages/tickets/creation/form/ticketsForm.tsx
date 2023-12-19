import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import '../../../members/creation/creationMember.css'
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useTicketsStore from "../../store/useTicketsStore";
import {getIcon} from "../../../../icons";
import {ButtonComponent} from "../../../../components/button";
import {TableComponent} from "../../../../components/table";
import {IColumns} from "../../../../interfaces/table";
import useLoginStore from "../../../login/store/useLoginStore";
import * as AiIcons from "react-icons/ai";

const columns: IColumns[] = [
    {
        id: "ownerId",
        label: "Titular",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "cardName",
        label: "Cartão",
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
        id: "modality",
        label: "Modalidade",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "balance",
        label: "Saldo",
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

function createData(cardName, finalCard, modality, balance, ownerId, currency, actions, index) {
    return {
        cardName, finalCard, modality, balance, ownerId, currency, actions, index
    };
}

type RowType = {
    cardName: string;
    finalCard: number;
    modality: string;
    balance: string;
    ownerId: number;
    currency: string;
    actions: React.ReactNode[];
    index: number;
};
export const TicketsForm: FunctionComponent = () => {
    const formStore = useTicketsStore();
    const globalStore = useGlobalStore();
    const loginStore = useLoginStore();

    const [rows, setRows] = useState<RowType[]>([]);
    const [finalCard, setFinalCard] = useState("");

    useEffect(() => {
        formStore.resetFormStore();
        formStore.resetForm();
        formStore.setName('')
        setFinalCard('');
    }, []);

    const actions = (index) => (
        <div style={{width: "50%", display: "flex"}}>
            <AiIcons.AiOutlineDelete style={{marginLeft: "6px"}} className="icon_delete" size={18}
                                     onClick={() => deleteItemFormList(index)}/>
        </div>
    );

    const handleAdd = () => {
        const updateList = [...formStore.formList];
        updateList.push(
            {
                cardName: formStore.form.cardName,
                finalCard: formStore.form.finalCard,
                modality: globalStore.modality.filter(mo => mo.id.toString() === formStore.form.modality.toString())[0].description,
                balance: formStore.form.balance,
                ownerId: formStore.form.ownerId,
                userAuthId: loginStore.userId,
                index: updateList.length,
                currency: globalStore.currency.filter(fre => fre.id === formStore.form.currency)[0].description,
            }
        )
        formStore.setFormList(updateList);
        const transformedRows = updateList.map((data: any, index: number) => createData(
            data.cardName,
            data.finalCard,
            data.modality,
            data.balance,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0] ? globalStore.members.filter(mem => mem.id === data.ownerId)[0].name : data.ownerId,
            data.currency,
            actions(index),
            index
        ));
        setRows(transformedRows);
        formStore.resetForm();
        setFinalCard('');
    }

    const deleteItemFormList = async (i) => {
        let list = formStore.deleteItemFormList(i);

        const transformedRows = list.map((data: any, index: number) => createData(
            data.cardName,
            data.finalCard,
            data.modality,
            data.balance,
            globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
            data.currency,
            actions(index),
            index
        ));
        setRows(transformedRows);
    }

    const handleFinal = (value) => {
        setFinalCard(value);
        formStore.setFinalCard(value);
    }

    return (
        <>
            <>
                <h3 className="title-bank">Entidade Financeira</h3>
                <div className="register-member">
                    <Input
                        label={Messages.titles.entityName}
                        disabled={false}
                        width="200px"
                        getValue={(value) => formStore.setName(value)}
                        inputValue={formStore.name}
                    />
                    {formStore.name && <div>{getIcon(formStore.name, "34", "34")}</div>}
                </div>
                <h3 className="title-bank">Cartões</h3>
                <div className="register-member">
                    <DropdownSingleSelect
                        label={Messages.titles.owner}
                        data={globalStore.members}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => formStore.setOwner(value)}
                        value={formStore.form.ownerId}
                    />
                    <Input
                        label={Messages.titles.cardName}
                        disabled={false}
                        width="200px"
                        getValue={(value) => formStore.setCardName(value)}
                        inputValue={formStore.form.cardName}
                    />

                    <Input
                        label={Messages.titles.finalCard}
                        disabled={false}
                        width="200px"
                        getValue={(value) => handleFinal(value)}
                        inputValue={finalCard}
                        maskNumeric={true}
                        numericLimit={4}
                    />

                    <DropdownSingleSelect
                        label={Messages.titles.modality}
                        data={[globalStore.modality[1]]}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => formStore.setModality(value)}
                        value={formStore.form.modality}
                    />
                </div>
                <div className="register-member">
                    <DropdownSingleSelect
                        label={Messages.titles.currency}
                        data={globalStore.currency}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setCurrency(value)}
                        value={formStore.form.currency}
                    />

                    <Input
                        label={Messages.titles.balance}
                        disabled={false}
                        width="200px"
                        getValue={(value) => formStore.setBalance(value)}
                        inputValue={formStore.form.balance}
                    />
                </div>
                <div className="add-button-member">
                    <ButtonComponent
                        label={Messages.titles.addTickets}
                        disabled={!formStore.form.cardName || !formStore.form.ownerId || !formStore.form.finalCard || !formStore.form.modality || !formStore.form.currency || !formStore.form.balance || !formStore.form.cardName }
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
                {rows.length > 0 &&
                    <div className="register-member" style={{marginLeft: "18px"}}>
                        <TableComponent
                            columns={columns}
                            rows={rows}
                            pagination={false}
                            width={"60%"}
                        />
                    </div>
                }
            </>
        </>
    );
}