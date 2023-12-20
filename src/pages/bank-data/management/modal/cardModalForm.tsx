import React, {FunctionComponent, useEffect, useState} from "react";
import UseGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useLoginStore from "../../../login/store/useLoginStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";

import "../../../groups/management/modal/modal.css";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import {GlobalService} from "../../../global-informtions/service";

interface IModal {
    currentForm: any;
    updateCardValue: (field: string, value: any) => void
}

export const CardModalForm: FunctionComponent<IModal> = ({currentForm, updateCardValue}) => {
    const globalStore = UseGlobalStore();
    const loginStore = useLoginStore();
    const service = GlobalService();
    const [programData, setProgramData] = useState([]);

    const days = [];

    for (let i = 1; i <= 31; i++) {
        days.push({id: i, name: i});
    }

    useEffect(() => {
        console.log(currentForm)
        const fetchData = async () => {
            setProgramData(await getProgram(currentForm.owner.id));
        }
        fetchData().then();
    }, []);

    const getProgram = async (id: number) => {
        const response = await service.getProgramById(id);
        return response.data.data;
    };

    return (
        <div>
            <div className="register-member">
                <Input
                    label={Messages.titles.cardName}
                    disabled={false}
                    width="200px"
                    getValue={(value) => updateCardValue("name", value)}
                    inputValue={currentForm.name}
                />


                <DropdownSingleSelect
                    label={Messages.titles.status}
                    data={globalStore.status}
                    disabled={false}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"description"}
                    getValue={(value) => updateCardValue("status", value)}
                    value={currentForm.status}
                />

            </div>
            <div className="register-member">


                <DropdownSingleSelect
                    label={Messages.titles.owner}
                    data={globalStore.members}
                    disabled={true}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => updateCardValue("owner", value)}
                    value={currentForm.owner.id}
                />


                <Input
                    label={Messages.titles.finalCard}
                    disabled={true}
                    width="200px"
                    getValue={(value) => updateCardValue("finalNumber", value)}
                    inputValue={currentForm.finalNumber}
                    maskNumeric={true}
                    numericLimit={4}
                />


            </div>

            <div className="register-member">

                <DropdownSingleSelect
                    label={Messages.titles.modality}
                    data={globalStore.modality}
                    disabled={true}
                    width={"200px"}
                    idProperty={"id"}
                    descriptionProperty={"name"}
                    getValue={(value) => updateCardValue("modality", value)}
                    value={globalStore.modality.filter(mod => mod.description = currentForm.modality)[0].id}
                />


                {currentForm.modality && (currentForm.modality === "Crédito" || currentForm.modality && currentForm.modality) === "Crédito/Débito" &&
                    <DropdownSingleSelect
                        label={Messages.titles.dueDate}
                        data={days}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => updateCardValue("dueDate", value)}
                        value={currentForm.dueDate}
                    />
                }
            </div>
            <div className="register-member">
                {currentForm.modality && (currentForm.modality === "Crédito" || currentForm.modality && currentForm.modality === "Crédito/Débito") &&
                    <DropdownSingleSelect
                        label={Messages.titles.closingDate}
                        data={days}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => updateCardValue("closingDate", value)}
                        value={currentForm.closingDate}
                    />
                }

                {currentForm.program &&
                    <DropdownSingleSelect
                        label={Messages.titles.program}
                        data={programData}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => updateCardValue("program", globalStore.program.filter(pro => pro.id === value)[0]) }
                        value={currentForm.program.id}
                    />
                }
            </div>

            <div className="register-member">
                {currentForm.program &&
                    <Input
                        label={Messages.titles.point}
                        disabled={false}
                        width="200px"
                        getValue={(value) => updateCardValue("point", value)}
                        inputValue={currentForm.point}
                        maskNumeric={true}

                    />
                }

                {currentForm.currency &&
                    <DropdownSingleSelect
                        label={Messages.titles.currency}
                        data={globalStore.currency}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"description"}
                        getValue={(value) => updateCardValue("currency", value)}
                        value={globalStore.currency.filter(currency => currency.description === currentForm.currency)[0].id}
                    />
                }
            </div>

        </div>
    );
};
