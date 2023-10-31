import React, {FunctionComponent, useEffect, useState} from "react";
import usePointFormStore from "../store/usePointFormStore";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import {InputDataComponent} from "../../../../components/input-data";
import {FormControlLabel, Switch} from "@mui/material";
import useLoginStore from "../../../login/store/useLoginStore";


export const TransferForm: FunctionComponent = () => {
    const formStore = usePointFormStore();
    const loginStore = useLoginStore();
    const [data, setDate] = useState();
    const [hasbonus, setBonus] = useState(false);
    const globalStore = useGlobalStore();
    const [valueOrigin, setValueOrigin] = useState(1);
    const [valueDestiny, setValueDestiny] = useState(1)


    useEffect(() => {
        formStore.resetFormStore();
        formStore.setFormTransfer({
            originProgramId: 0,
            destinyProgramId: 0,
            quantity: 0,
            pointsExpirationDate: null,
            originValue: valueOrigin,
            destinyValue: valueDestiny,
            bonus: 0,
            userAuthId: loginStore.userId
        })
    }, []);

    const handleData = (date) => {
        setDate(date);
        formStore.setPointsExpirationDate(date);
    }

    const handleValueOrigin = (value) => {
        setValueOrigin(value);
        formStore.setOriginValue(value);
    }

    const handleValueDestiny = (value) => {
        setValueDestiny(value);
        formStore.setDestinyValue(value);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBonus(event.target.checked);
    };

    return (
        <div>
            <div>
                <h3 className="title-bank">{Messages.titles.program}</h3>
                <div className="register-member">

                    <DropdownSingleSelect
                        label={Messages.titles.origin}
                        data={globalStore.program}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setOriginProgramId(value)}
                    />

                    <DropdownSingleSelect
                        label={Messages.titles.destiny}
                        data={globalStore.program}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setDestinyProgramId(value)}
                    />

                    <Input
                        label={Messages.titles.quantity}
                        disabled={false}
                        width="200px"
                        maskNumeric={true}
                        getValue={(value) => formStore.setQuantity(value)}
                        viewMode={false}
                    />

                </div>
            </div>
            <div>
                <h3 className="title-bank">{Messages.titles.operation}</h3>
                <div className="register-member">
                    <Input
                        label={Messages.titles.origin}
                        disabled={false}
                        width="200px"
                        getValue={(value) => handleValueOrigin(value)}
                        inputValue={valueOrigin}
                        viewMode={false}
                    />
                    <span>PARA</span>
                    <Input
                        label={Messages.titles.destiny}
                        disabled={false}
                        width="200px"
                        getValue={(value) => handleValueDestiny(value)}
                        inputValue={valueDestiny}
                        viewMode={false}
                    />
                    <InputDataComponent
                        label={Messages.titles.expirationDate}
                        disabled={false}
                        width="200px"
                        getValue={(value) => handleData(value)}
                        viewMode={false}
                    />
                    <FormControlLabel style={{marginLeft:"12px"}}
                        control={
                            <Switch checked={hasbonus} onChange={handleChange} name="gilad"/>
                        }
                        label={Messages.titles.bonus}
                    />
                </div>
            </div>
            {hasbonus &&
                <div>
                    <h3 className="title-bank">{Messages.titles.bonus}</h3>
                    {formStore.formProgramList.map((program, index) => (
                        <div className="register-member">
                            <Input
                                label={Messages.titles.percentage}
                                disabled={false}
                                width="200px"
                                getValue={(value) => formStore.setBonus(value)}
                                inputValue={null}
                                viewMode={false}
                            />
                        </div>
                    ))}
                </div>
            }

        </div>
    );
};
