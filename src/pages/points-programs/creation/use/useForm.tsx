import React, {FunctionComponent, useEffect, useState} from "react";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useLoginStore from "../../../login/store/useLoginStore";
import useUpdateFormStore from "../store/useUpdateFormStore";
import {GlobalService} from "../../../global-informtions/service";
import {Toast} from "../../../../components/toast";


export const UseForm: FunctionComponent = () => {
    const formStore = useUpdateFormStore();
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const service = GlobalService();
    const [program, setProgram] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [severityType, setSeverityType] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [open, setOpen] = useState(false);
    const [disableField, setDisableField] = useState(true);

    useEffect(() => {
        formStore.resetFormStore();
        formStore.setProgramId(0)
        formStore.setValue(0);
        formStore.setUserAuthId(loginStore.userId);
    }, []);

    const validateValue = (value) => {
        return /^0+$/.test(value);
    };

    const getProgram = async (id) => {
        const response = await service.getProgramById(id);
        if(response.data.data.length === 0) {
            setToastMessage(Messages.messages.ownerEmpty);
            setSeverityType("error");
            setDisableField(true);
            setOpen(true);
        } else {
            setDisableField(false);
        }

        return response.data.data;
    };

    const handleOwner = async (value) => {
        formStore.setOwnerId(value);
        setProgram(await getProgram(value));
    };

    const handleCloseToast = () => {
        setOpen(false);
    };


    return (
        <div>
            <div>
                <div className="register-member">
                    <DropdownSingleSelect
                        label={Messages.titles.owner}
                        data={globalStore.members}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => handleOwner(value)}
                    />
                    <DropdownSingleSelect
                        label={Messages.titles.program}
                        data={program}
                        disabled={disableField}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setProgram(value)}
                    />

                    <Input
                        label={Messages.titles.quantity}
                        disabled={disableField}
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
            <Toast
                severity={severityType}
                width="100%"
                duration={2000}
                message={toastMessage}
                open={open}
                onClose={handleCloseToast}
            />
        </div>
    );
};
