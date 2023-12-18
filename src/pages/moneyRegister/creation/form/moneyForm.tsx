import React, {FunctionComponent} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import '../../../members/creation/creationMember.css'
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import useMoneyStore from "../../store/moneyStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";

interface IMemberForm {
    i: number;
    hasDelete: boolean;
}

export const MoneyForm: FunctionComponent<IMemberForm> = ({i, hasDelete}: IMemberForm) => {
    const formStore = useMoneyStore();
    const globalStore = useGlobalStore();

    const handleDeleteMember = (i) => {
        formStore.deleteItemFormList(i);
    }

    return (
        <div className="register-member">

            <DropdownSingleSelect
                label={Messages.titles.owner}
                data={globalStore.members}
                disabled={false}
                width={"200px"}
                idProperty={"id"}
                descriptionProperty={"name"}
                getValue={(value) => formStore.setFormListValue(i, 'ownerId', value)}
                value={formStore.formList[i].ownerId}
            />

            <DropdownSingleSelect
                label={Messages.titles.currency}
                data={globalStore.currency}
                disabled={false}
                width={"200px"}
                idProperty={"id"}
                descriptionProperty={"description"}
                getValue={(value) => formStore.setFormListValue(i, 'currency', value)}
                value={formStore.formList[i].currency}
            />

            <Input
                label={Messages.titles.name}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setFormListValue(i, 'value', value)}
                inputValue={formStore.formList[i].value}
            />

            {hasDelete && (
                <ButtonComponent
                    disabled={false}
                    width="30px"
                    height="30px"
                    cursor="pointer"
                    borderRadius="4px"
                    color="red"
                    background="transparent"
                    border="none"
                    padding="2px"
                    marginBottom="1px"
                    fontWeight="400"
                    icon={<BsTrash size={12}/>}
                    action={() => handleDeleteMember(i)}/>
            )}
        </div>
    );
}