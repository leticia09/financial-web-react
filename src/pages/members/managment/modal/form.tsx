import React, {FunctionComponent, useEffect} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "../../creation/creationMember.css"
import {ColorPickerComponent} from "../../../../components/color";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import UseGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useFormStore from "../../creation/store/useFormStore";
import useLoginStore from "../../../login/store/useLoginStore";
import {MembersManagementService} from "../../service";

interface IForm {
    currentForm: any;
    i: number,
}

export const Form: FunctionComponent<IForm> = ({currentForm, i}: IForm) => {
    const globalStore = UseGlobalStore();
    const formStore = useFormStore();
    const loginStore = useLoginStore();
    const service = MembersManagementService()

    useEffect(() => {
        const fetchData = async () => {
            const response = await service.getMembers(loginStore.userId);
            formStore.setFormList(response.data.data)
        }
        fetchData().then();
    }, []);

    return (
        <>
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
            </div>
            <div className="register-member">
                <DropdownSingleSelect
                    label={Messages.titles.status}
                    data={globalStore.status}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    value={currentForm.status}
                    getValue={(value) => formStore.setFormListValue(i, 'status', value)}
                />
            </div>
        </>
    );
}