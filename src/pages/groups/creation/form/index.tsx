import React, {FunctionComponent, useEffect} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import useGroupStore from "../store/useGroupStore";
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import useLoginStore from "../../../login/store/useLoginStore";

export const GroupForm: FunctionComponent = () => {

    const loginStore = useLoginStore();
    const formStore = useGroupStore();

    useEffect(() => {
        formStore.resetFormStore();
    }, []);

    const handleAdd = () => {
        const updateList = [...formStore.formList.specificGroups];
        updateList.push(
            {
                name: '',
                index: updateList.length,
                userAuthId: loginStore.userId,
            }
        )
        formStore.setSpecificList(updateList);
    }
    const handleDeleteMember = (i) => {
        formStore.deleteItemFormList(i);
    }

    return (
        <>
            <h3 className="title-bank">{Messages.titles.macroGroup}</h3>
            <div className="register-member">
                <Input
                    label={Messages.titles.name}
                    disabled={false}
                    width="200px"
                    getValue={(value) => formStore.setGroupMacroName(value)}
                />
            </div>
            { formStore.formList.specificGroups.length > 0 &&
                <h3 className="title-bank">{Messages.titles.specificGroup}</h3>
            }

            {formStore.formList.specificGroups.map((groupEs, i) => (
                <div className="register-member" key={groupEs.index}>
                    <Input
                        label={Messages.titles.name}
                        disabled={false}
                        width="200px"
                        getValue={(value) => formStore.setSpecificListValue(i, 'name', value)}
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
        </>
    );
}