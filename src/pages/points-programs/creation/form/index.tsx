import React, {FunctionComponent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Input} from "../../../../components/input";
import {Messages} from "../../../../internationalization/message";
import {ButtonComponent} from "../../../../components/button";
import {BsTrash} from "react-icons/bs";
import usePointFormStore from "../store/usePointFormStore";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {InputDataComponent} from "../../../../components/input-data";


export const ProgramPointForm: FunctionComponent = () => {
    const location = useLocation();
    const formStore = usePointFormStore();
    const globalStore = useGlobalStore();
    const [urlType, setUrlType] = useState("");
    const [type, setType] = useState(null);
    const [data, setDate] = useState();


    useEffect(() => {
        location.pathname.includes("cartao")
            ? setUrlType("card")
            : setUrlType("program");
        formStore.resetFormStore();
    }, []);

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
        <div>
            <div>
                <h3 className="title-bank">{Messages.titles.program}</h3>
                {urlType === 'program' && formStore.formProgramList.map((program, index) => (
                    <div className="register-member" key={index}>
                        <Input
                            label={Messages.titles.name}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setFormListValue(index, 'program', value)}
                            viewMode={false}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.typeOfScore}
                            data={globalStore.typeOfScore}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => handleType(value, index)}
                            value={type}
                        />
                        <Input
                            label={Messages.titles.value}
                            disabled={false}
                            width="200px"
                            maskNumeric={true}
                            getValue={(value) => formStore.setFormListValue(index, 'value', value)}
                            viewMode={false}
                        />
                        <InputDataComponent
                            label={Messages.titles.expirationDate}
                            disabled={false}
                            width="200px"
                            getValue={(value) => handleData(value, index)}
                            viewMode={false}
                        />
                        {index > 0 && (
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
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};
