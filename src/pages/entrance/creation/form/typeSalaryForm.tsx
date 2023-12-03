import React, {FunctionComponent, useEffect} from "react";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import "./../../../members/creation/creationMember.css"
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import useLoginStore from "../../../login/store/useLoginStore";
import useEntranceStore from "../../store/useEntranceStore";
import {EntranceService} from "../../service";


export const TypeSalaryForm: FunctionComponent = () => {

    const formStore = useEntranceStore();
    const loginStore = useLoginStore();
    const service = EntranceService();

    useEffect(() => {
        const fetchData = async () => {
            const typeSalaryResponse = await service.getTypeSalary(loginStore.userId);
            formStore.setTypeSalaryList(typeSalaryResponse.data);
        };
        fetchData();

    }, []);

    const handleAdd = () => {
        const updateList = [...formStore.typeSalary];
        updateList.push(
            {
                description: '',
                userAuthId: loginStore.userId,
                deleted: false
            }
        )
        formStore.setTypeSalaryList(updateList);
    }

    const handleDeleteMember = (i) => {
         formStore.deleteSalaryType(i);
    }

    return (
        <>
            {formStore.typeSalary.length > 0 &&
                formStore.typeSalary.map((type, index) => (
                    <div className="register-member" key={index}>
                        <Input
                            label={Messages.titles.description}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setTypeSalary(index, 'description', value)}
                            inputValue={type ? type.description : ""}
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
                            action={() => handleDeleteMember(index)}
                        />
                    </div>
                ))}
            < div className="register-member" style={{paddingLeft: "8px"}}>
                <ButtonComponent
                    label={Messages.titles.addTypeOfEntrance}
                    disabled={false}
                    width="110px"
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