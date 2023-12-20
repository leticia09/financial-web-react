import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import UseGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useUpdateFormStore from "../../creation/store/useUpdateFormStore";
import useLoginStore from "../../../login/store/useLoginStore";
import {Input} from "../../../../components/input";

interface IModal {
    currentForm: any
}

export const ModalForm: FunctionComponent<IModal> = ({currentForm}: IModal) => {
    const globalStore = UseGlobalStore();
    const formStore = useUpdateFormStore();
    const loginStore = useLoginStore();
    const [status, setStatus] = useState(currentForm.status);

    useEffect(() => {
        formStore.setUserAuthId(loginStore.userId);
        formStore.setStatus(currentForm.status);
        formStore.setValue(currentForm.value);
    }, [])

    const handleStatus = (value) => {
        setStatus(value)
        formStore.setStatus(value)
    }

    return (
        <div>
            <div>
                <div className="register-member">
                    <DropdownSingleSelect
                        label={Messages.titles.status}
                        data={globalStore.status}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        value={status}
                        getValue={(value) => handleStatus(value)}
                    />
                    <Input
                        label={Messages.titles.currentValue}
                        disabled={false}
                        width="200px"
                        maskNumeric={true}
                        getValue={(value) => formStore.setValue(value)}
                        inputValue={formStore.value}
                        viewMode={false}
                    />
                </div>
            </div>
        </div>
    );

};
