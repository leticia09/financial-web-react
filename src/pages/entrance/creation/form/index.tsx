import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import {ButtonComponent} from "../../../../components/button";
import useLoginStore from "../../../login/store/useLoginStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useEntranceStore from "../../store/useEntranceStore";
import {ModalComponent} from "../../../../components/modal";
import {EntranceService} from "../../service";
import {TypeSalaryForm} from "./typeSalaryForm";
import {ValidateError} from "../../../../validate-error/validate-error";

interface IForm {
    i: number;
    hasDelete: boolean;
}

export const EntranceForm: FunctionComponent<IForm> = ({i, hasDelete}: IForm) => {

    const formStore = useEntranceStore();
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const [openModal, setOpenModal] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [typeSalaryData, setTypeSalaryData] = useState([]);
    const service = EntranceService();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const typeSalaryResponse = await service.getTypeSalary(loginStore.userId);
            console.log(typeSalaryResponse.data)
            setTypeSalaryData(typeSalaryResponse.data);
        };
        fetchData();

    }, []);

    const handleAdd = () => {
        // const updateList = [...formStore.formList.specificGroups];
        // updateList.push(
        //     {
        //         name: '',
        //         index: updateList.length,
        //         userAuthId: loginStore.userId,
        //     }
        // )
        // formStore.setSpecificList(updateList);
    }
    const handleAction = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    };
    const handleDeleteMember = (i) => {
        // formStore.deleteItemFormList(i);
    }

    const save = async () => {
        try {
            let response = await service.edit(formStore.typeSalary);

            if (response.data.message === "success") {
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);

                setTimeout(() => {
                    if (response.data.severity === "success")
                        setOpen(false);
                        setOpenModal(false);
                }, 2000);

            } else {
                setOpen(true);
                setOpenModal(false);
                setSeverity("error");
                setToastMessage(ValidateError(response.data.message));
            }

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
        }
    };


    return (
        <>
            <div className="register-member">
                <Input
                    label={Messages.titles.source}
                    disabled={false}
                    width="200px"
                    getValue={(value) => formStore.setFormListValue(i, "source", value, loginStore.userId)}
                    inputValue={formStore.formList[i].source}
                />
                <DropdownSingleSelect
                    label={Messages.titles.typeOfEntrance}
                    data={typeSalaryData}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => formStore.setFormListValue(i, "type", value, loginStore.userId)}
                    value={formStore.formList[i].ownerId}
                    labelAction={"Gerenciar Tipos"}
                    getAction={handleAction}
                />
                <DropdownSingleSelect
                    label={Messages.titles.owner}
                    data={globalStore.members}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => formStore.setFormListValue(i, "ownerId", value, loginStore.userId)}
                    value={formStore.formList[i].ownerId}
                />

            </div>

            <div className="add-button-member">
                <ButtonComponent
                    label={Messages.titles.addEntrance}
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

            {openModal &&
                <ModalComponent
                    openModal={openModal}
                    setOpenModal={handleClose}
                    label={Messages.titles.managementTypes}
                    getValue={save}
                    Form={
                        <>
                            {typeSalaryData.length > 0 ? (
                                typeSalaryData.map((type, index) => (
                                    <TypeSalaryForm
                                        key={index}
                                        currentForm={formStore.typeSalary[index]}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <TypeSalaryForm/>
                            )}
                        </>
                    }
                    disabledSave={false}
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />
            }
        </>
    );
}