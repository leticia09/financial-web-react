import React, {FunctionComponent, useEffect, useState} from "react";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useLoginStore from "../../../login/store/useLoginStore";
import useUpdateFormStore from "../store/useUpdateFormStore";


export const UseForm: FunctionComponent = () => {
    const formStore = useUpdateFormStore();
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();

    useEffect(() => {
        formStore.resetFormStore();
        formStore.setUserAuthId(loginStore.userId);
    }, []);

    const validateValue = (value) => {
        return /^0+$/.test(value);
    };

    return (
        <div>
            <div>
                <div className="register-member">
                    <DropdownSingleSelect
                        label={Messages.titles.program}
                        data={globalStore.program}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setProgram(value)}
                    />

                    <Input
                        label={Messages.titles.quantity}
                        disabled={false}
                        width="200px"
                        maskNumeric={true}
                        invalidField={formStore.formUse.value? validateValue(formStore.formUse.value.toString()) : false}
                        invalidMessage={Messages.messages.zero}
                        inputValue={formStore.formUse.value}
                        getValue={(value : number) => formStore.setProgramValue(value)}
                        viewMode={false}
                    />

                </div>
            </div>
        </div>
    );
};
