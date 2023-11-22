import React, {FunctionComponent, useEffect} from "react";
import UseGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useLoginStore from "../../../login/store/useLoginStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";

import "../../../groups/management/modal/modal.css";
import {DropdownSingleSelect} from "../../../../components/dropdown";

interface IModal {
    currentForm: any;
    mode: string
    updateAccountValue: (field: string, value: any) => void
}

export const AccountModalForm: FunctionComponent<IModal> = ({currentForm, mode, updateAccountValue}) => {
    const globalStore = UseGlobalStore();
    const loginStore = useLoginStore();

    return (
        <div>
            <div className="register-member">

                <Input
                    label={Messages.titles.accountNumber}
                    disabled={mode === "VIEW"}
                    width="200px"
                    getValue={(value) => updateAccountValue("accountNumber", value)}
                    inputValue={currentForm.accountNumber}
                    maskNumeric={true}
                />


                <DropdownSingleSelect
                    label={Messages.titles.status}
                    data={globalStore.status}
                    disabled={mode === "VIEW"}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => updateAccountValue("status", value)}
                    value={currentForm.status}
                />

            </div>
            <div className="register-member">

                <DropdownSingleSelect
                    label={Messages.titles.owner}
                    data={globalStore.members}
                    disabled={mode === "VIEW"}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => updateAccountValue("owner", value)}
                    value={currentForm.owner}
                />


                <Input
                    label={Messages.titles.value}
                    disabled={mode === "VIEW"}
                    width="200px"
                    getValue={(value) => updateAccountValue("value", value)}
                    inputValue={currentForm.value}
                    maskNumeric={true}
                />

            </div>

        </div>
    );
};
