import React, {FunctionComponent, useEffect} from "react";
import {Messages} from "../../../../internationalization/message";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import UseGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useUpdateFormStore from "../../creation/store/useUpdateFormStore";
import useLoginStore from "../../../login/store/useLoginStore";


export const ModalForm: FunctionComponent = () => {
    const globalStore = UseGlobalStore();
    const formStore = useUpdateFormStore();
    const loginStore  = useLoginStore();

    useEffect(() => {
        formStore.setUserAuthId(loginStore.userId);
    }, [])

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
                        getValue={(value) => formStore.setStatus(globalStore.status.filter(st => st.id === value)[0].description)}
                    />
                </div>
            </div>
        </div>
    );
};
