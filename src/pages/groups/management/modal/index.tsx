import React, {FunctionComponent} from "react";
import UseGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useLoginStore from "../../../login/store/useLoginStore";
import useGroupStore from "../../creation/store/useGroupStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import "./modal.css";

interface IModal {
    index: number;
}

export const ModalGroupForm: FunctionComponent<IModal> = ({index}) => {
    const globalStore = UseGlobalStore();
    const formStore = useGroupStore();
    const loginStore = useLoginStore();

    const handleAdd = () => {
        const updateList = [...formStore.formListEdit[index].specificGroups];
        updateList.push(
            {
                name: '',
                index: updateList.length,
                status: 0,
                userAuthId: loginStore.userId,
            }
        )
        formStore.setSpecificListEdit(updateList, index);
    }
    const handleDeleteMember = (i) => {
        formStore.deleteItemFormListEdit(i, index);
    }


    return (
        <div>
            <h3 className="title-bank">{Messages.titles.macroGroup}</h3>
            <div className="register-member">
                <Input
                    label={Messages.titles.name}
                    disabled={false}
                    width="200px"
                    getValue={(value) => formStore.setGroupMacroNameEdit(value, index)}
                    inputValue={formStore.formListEdit[index].name}
                />
                <DropdownSingleSelect
                    label={Messages.titles.status}
                    data={globalStore.status}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => formStore.setStatusEdit(value, index)}
                    value={formStore.formListEdit[index].status}
                />
            </div>
            <h3 className="title-bank">{Messages.titles.specificGroup}</h3>
            <div className="content-edit-form">
                {formStore.formListEdit[index].specificGroups && formStore.formListEdit[index].specificGroups.map((groupEs, i) => (
                    <div className="register-member" key={groupEs.index}>
                        <Input
                            label={Messages.titles.name}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setSpecificListValueEdit(i, 'name', value, index)}
                            inputValue={formStore.formListEdit[index].specificGroups[i].name}
                        />


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

                    </div>
                ))
                }
            </div>

            <div className="add-button-member">
                <ButtonComponent
                    label={Messages.titles.addGroup}
                    disabled={false}
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
    );
};
