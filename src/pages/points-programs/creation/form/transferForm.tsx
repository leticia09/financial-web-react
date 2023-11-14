import React, {FunctionComponent, useEffect, useState} from "react";
import usePointFormStore from "../store/usePointFormStore";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import {InputDataComponent} from "../../../../components/input-data";
import {FormControlLabel, Switch} from "@mui/material";
import useLoginStore from "../../../login/store/useLoginStore";
import {GlobalService} from "../../../global-informtions/service";
import {Toast} from "../../../../components/toast";


export const TransferForm: FunctionComponent = () => {
    const formStore = usePointFormStore();
    const loginStore = useLoginStore();
    const [data, setDate] = useState();
    const [hasbonus, setBonus] = useState(false);
    const globalStore = useGlobalStore();
    const service = GlobalService();
    const [programOrigin, setProgramOrigin] = useState([]);
    const [programDestiny, setProgramDestiny] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [severityType, setSeverityType] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [open, setOpen] = useState(false);
    const [disableField, setDisableField] = useState(true);



    useEffect(() => {
        formStore.setFormTransfer({
            originProgramId: 0,
            destinyProgramId: 0,
            quantity: null,
            pointsExpirationDate: null,
            originValue: 1,
            destinyValue: 1,
            bonus: 0,
            userAuthId: loginStore.userId,
            ownerIdOrigin: 0,
            ownerIdDestiny: 0,
        });
    }, []);

    const getProgram = async (id) => {
        const response = await service.getProgramById(id);
        if(response.data.data.length === 0) {
            setToastMessage(Messages.messages.ownerEmpty);
            setSeverityType("error");
            setOpen(true);
            setDisableField(true);
        } else {
            setDisableField(false);
        }

        return response.data.data;
    };

    const handleData = (date) => {
        setDate(date);
        formStore.setPointsExpirationDate(date);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBonus(event.target.checked);
    };

    const handleOwnerOrigin = async (value) => {
        formStore.setOwnerOriginId(value);
        setProgramOrigin(await getProgram(value));
    };

    const handleOwnerDestiny = async (value) => {
        formStore.setOwnerDestinyId(value);
        setProgramDestiny(await getProgram(value));
    };


    const handleCloseToast = () => {
        setOpen(false);
    };


    const validateValue = (value) => {
        return /^0+$/.test(value);
    };

    return (
        <div>
            <div>
                <h3 className="title-bank">{Messages.titles.program}</h3>
                <div className="register-member">

                    <DropdownSingleSelect
                        label={Messages.titles.ownerOrigin}
                        data={globalStore.members}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => handleOwnerOrigin(value) }
                    />

                    <DropdownSingleSelect
                        label={Messages.titles.origin}
                        data={programOrigin}
                        disabled={disableField}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setOriginProgramId(value)}
                    />

                    <DropdownSingleSelect
                        label={Messages.titles.ownerDestiny}
                        data={globalStore.members}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => handleOwnerDestiny(value) }
                    />

                    <DropdownSingleSelect
                        label={Messages.titles.destiny}
                        data={programDestiny}
                        disabled={disableField}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => formStore.setDestinyProgramId(value)}
                    />
                    <Input
                        label={Messages.titles.quantity}
                        disabled={disableField}
                        width="200px"
                        maskNumeric={true}
                        invalidField={formStore.formTransfer.quantity? validateValue(formStore.formTransfer.quantity.toString()) : false}
                        invalidMessage={Messages.messages.zero}
                        inputValue={formStore.formTransfer.quantity}
                        getValue={(value : number) => formStore.setQuantity(value)}
                        viewMode={false}
                    />

                </div>
            </div>
            <div>
                <h3 className="title-bank">{Messages.titles.operation}</h3>
                <div className="register-member">
                    <Input
                        label={Messages.titles.origin}
                        disabled={disableField}
                        width="200px"
                        invalidField={formStore.formTransfer.originValue? validateValue(formStore.formTransfer.originValue.toString()) : false}
                        invalidMessage={Messages.messages.zero}
                        getValue={(value) => formStore.setOriginValue(value)}
                        inputValue={formStore.formTransfer.originValue}
                        viewMode={false}
                    />
                    <span>PARA</span>
                    <Input
                        label={Messages.titles.destiny}
                        disabled={disableField}
                        width="200px"
                        invalidField={formStore.formTransfer.destinyValue? validateValue(formStore.formTransfer.destinyValue.toString()) : false}
                        invalidMessage={Messages.messages.zero}
                        getValue={(value) => formStore.setDestinyValue(value)}
                        inputValue={formStore.formTransfer.destinyValue}
                        viewMode={false}
                    />
                    <InputDataComponent
                        label={Messages.titles.expirationDate}
                        disabled={disableField}
                        width="200px"
                        getValue={(value) => handleData(value)}
                        viewMode={false}
                    />
                    <FormControlLabel style={{marginLeft: "12px"}}
                                      control={
                                          <Switch  disabled={disableField} checked={hasbonus} onChange={handleChange} name="gilad"/>
                                      }
                                      label={Messages.titles.bonus}
                    />
                </div>
            </div>
            {hasbonus &&
                <div>
                    <h3 className="title-bank">{Messages.titles.bonus}</h3>
                    <div className="register-member">
                        <Input
                            label={Messages.titles.percentage}
                            disabled={false}
                            width="200px"
                            invalidField={formStore.formTransfer.bonus? validateValue(formStore.formTransfer.bonus.toString()) : false}
                            invalidMessage={Messages.messages.zero}
                            getValue={(value) => formStore.setBonus(value)}
                            inputValue={null}
                            viewMode={false}
                        />
                    </div>
                </div>
            }
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
