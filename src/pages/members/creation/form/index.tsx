import {FunctionComponent, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import './memberForm.css'
import useFormStore from "../store/useFormStore";
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import {ColorPickerComponent} from "../../../../components/color";

interface IMemberForm {
    i: number;
    hasDelete: boolean;
}

export const MemberForm: FunctionComponent<IMemberForm> = ({i, hasDelete}: IMemberForm) => {
    const formStore = useFormStore();

    const handleDeleteMember = (i) => {
        formStore.deleteItemFormList(i);
    }

    return (
        <div className="register-member">

            <Input
                label={Messages.titles.name}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setFormListValue(i, 'name', value)}
                inputValue={formStore.formList[i].name}
            />
            <ColorPickerComponent
                open={false}
                getValue={(value) => formStore.setFormListValue(i, 'color', value)}
                width="200px"
                label={Messages.titles.color}
                value={formStore.formList[i].color}
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