import {FunctionComponent, useState} from "react";
// @ts-ignore
import {DropdownSingleSelect} from "../../../../components/dropdown/index.tsx";
// @ts-ignore
import {Messages} from "../../../../internationalization/message/index.ts";
// @ts-ignore
import {InputCPF} from "../../../../components/input-cpf-validation/index.tsx";
// @ts-ignore
import {Input} from "../../../../components/input/index.tsx";
import './memberForm.css'
// @ts-ignore
import useFormStore from "./useFormStore.ts";
// @ts-ignore
import {ButtonComponent} from "../../../../components/button/index.tsx";
import {BsTrash} from "react-icons/bs";


interface IMemberForm {
    i: number;
    hasDelete: boolean;
}

export const data = [
    {
        id: 1,
        description: "Administrador"
    },
    {
        id: 2,
        description: "Visualização"
    }
];
export const MemberForm: FunctionComponent = ({i, hasDelete}: IMemberForm) => {
    const formStore =  useFormStore();

    const handleDeleteMember = (i) =>{
        formStore.deleteItemFormList(i);
    }

    return (
        <div className="register-member">

            <Input
                label={Messages.titles.name}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setFormListValue(i, 'name', value)}
            />

            <InputCPF
                label={Messages.titles.cpf}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setFormListValue(i, 'cpf', value)}
            />

            <Input
                label={Messages.titles.email}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setFormListValue(i, 'email', value)}
            />

            <DropdownSingleSelect
                label={Messages.titles.permission}
                data={data}
                disabled={false}
                width="200px"
                getValue={(value) => {formStore.setFormListValue(i, 'permission', value);
                    formStore.setFormListValue(i, 'index', i) }}
            />

            { hasDelete && (
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
                    marginBottom="20px"
                    fontWeight="400"
                    icon={<BsTrash size={10}/>}
                    action={() => handleDeleteMember(i)}/>
            )}
        </div>
    );
}