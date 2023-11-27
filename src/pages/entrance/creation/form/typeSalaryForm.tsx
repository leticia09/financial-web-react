import React, {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import useLoginStore from "../../../login/store/useLoginStore";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useEntranceStore from "../../store/useEntranceStore";
import {EntranceService} from "../../service";

interface IForm {
    currentForm?: any;
    index?: number;
}

export const TypeSalaryForm: FunctionComponent<IForm> = ({currentForm, index}: IForm) => {

    const formStore = useEntranceStore();
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const [openModal, setOpenModal] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [typeSalaryData, setTypeSalaryData] = useState([]);
    const service = EntranceService();

    useEffect(() => {
        const fetchData = async () => {
            const typeSalaryResponse = await service.getTypeSalary(loginStore.userId);
            console.log(typeSalaryResponse);
            setTypeSalaryData(typeSalaryResponse);
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

    const save = () => {

    };


    return (
        <div className="register-member">
            <Input
                label={Messages.titles.description}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setTypeSalary(index, 'description', value)}
                inputValue={currentForm ? currentForm.description: ""}
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
                action={() => handleDeleteMember(index)}/>
        </div>
    );
}