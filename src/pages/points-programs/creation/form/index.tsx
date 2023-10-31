import React, {FunctionComponent, useEffect, useState} from "react";
import {Input} from "../../../../components/input";
import {Messages} from "../../../../internationalization/message";
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import usePointFormStore from "../store/usePointFormStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {InputDataComponent} from "../../../../components/input-data";
import useScorePointStore from "../store/useScorePointStore";

interface IForm {
    i: number;
    hasDelete: boolean;
}

export const ProgramPointForm: FunctionComponent<IForm> = ({i, hasDelete}: IForm) => {
    const formStore = useScorePointStore();
    const globalStore = useGlobalStore();
    const [type, setType] = useState("");
    const [data, setDate] = useState();


    const handleDeleteMember = (index: number) => {
        formStore.deleteItemFormList(index);
    };

    const handleData = (date, index) => {
        setDate(date);
        formStore.setFormListValue(index, 'pointsExpirationDate', date);
    }

    const handleType = (type, index) => {
        const selectedType = globalStore.typeOfScore.find(item => item.id === type);
        setType(selectedType.description);
        formStore.setFormListValue(index, 'typeOfScore', selectedType.description);
    }

    return (
        <div className="register-member">
            <Input
                label={Messages.titles.name}
                disabled={false}
                width="200px"
                getValue={(value) => formStore.setFormListValue(i, 'program', value)}
                viewMode={false}
            />
            <DropdownSingleSelect
                label={Messages.titles.typeOfScore}
                data={globalStore.typeOfScore}
                disabled={false}
                width={"200px"}
                idProperty={"id"}
                descriptionProperty={"description"}
                getValue={(value) => handleType(value, i)}
                value={type}
            />
            <Input
                label={Messages.titles.value}
                disabled={false}
                width="200px"
                maskNumeric={true}
                getValue={(value) => formStore.setFormListValue(i, 'value', value)}
                viewMode={false}
            />
            <InputDataComponent
                label={Messages.titles.expirationDate}
                disabled={false}
                width="200px"
                getValue={(value) => handleData(value, i)}
                viewMode={false}
            />
            {hasDelete && (
                <ButtonComponent
                    disabled={false}
                    width="70px"
                    height="30px"
                    cursor="pointer"
                    borderRadius="4px"
                    color="red"
                    background="transparent"
                    border="none"
                    padding="2px"
                    marginBottom="1px"
                    fontWeight="400"
                    haveMenu={false}
                    icon={<BsTrash size={12}/>}
                    action={() => handleDeleteMember
                    (i)}
                />
            )}
        </div>
    );
};
