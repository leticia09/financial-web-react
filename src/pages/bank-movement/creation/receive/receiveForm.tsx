import React, {FunctionComponent, useEffect, useState} from "react";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {Messages} from "../../../../internationalization/message";
import {Input} from "../../../../components/input";
import {DropdownSingleSelect} from "../../../../components/dropdown";
import {InputDataComponent} from "../../../../components/input-data";
import useLoginStore from "../../../login/store/useLoginStore";
import {ButtonComponent} from "../../../../components/button";
import {TableComponent} from "../../../../components/table";
import {IColumns} from "../../../../interfaces/table";
import * as AiIcons from "react-icons/ai";
import {getMonth, getYear, isAfter} from "date-fns";
import {EntranceService} from "../../../entrance/service";
import movementBankStore from "../../store";

const columns: IColumns[] = [
    {
        id: "ownerId",
        label: "Titular",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "entrance",
        label: "Receita",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "salary",
        label: "Salário Líquido",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },

    {
        id: "receiveDate",
        label: "Data Recebimento",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "referencePeriod",
        label: "Período Referência",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "obs",
        label: "Observação",
        minWidth: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "actions",
        label: "Ações",
        minWidth: 70,
        width: 30,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];

function createData(entrance, ownerId, salary, receiveDate, referencePeriod, obs, actions, index) {
    return {entrance, ownerId, salary, receiveDate, referencePeriod, obs, actions, index};
}

type RowType = {
    entrance: string;
    salary: string;
    ownerId: number;
    receiveDate: string;
    referencePeriod: string;
    obs: string;
    actions: React.ReactNode[];
    index: number;
};

export const ReceiveForm: FunctionComponent = () => {
        const formStore = movementBankStore();
        const loginStore = useLoginStore();
        const globalStore = useGlobalStore();
        const service = EntranceService();
        const [rows, setRows] = useState<RowType[]>([]);
        const [paymentRefer, setPaymentRefer] = useState("");
        const [salary, setSalary] = useState("");
        const [entranceData, setEntranceData] = useState([]);
        const [currency, setCurrency] = useState([]);
        const [entranceAllData, setEntranceAllData] = useState([]);

        const actions = (index) => (
            <div style={{width: "50%", display: "flex"}}>
                <AiIcons.AiOutlineDelete style={{marginLeft: "6px"}} className="icon_delete" size={18}
                                         onClick={() => deleteItemFormList(index)}/>
            </div>
        );

        useEffect(() => {
            setPaymentRefer(getCurrentMonthYear());
            formStore.setFormList([]);
            formStore.resetFormStore();
            formStore.setReferencePeriod(getCurrentMonthYear());
        }, []);

        const getCurrentMonthYear = () => {
            const currentDate = new Date();
            const month = getMonth(currentDate) + 1;
            const year = getYear(currentDate);

            return `${String(month).padStart(2, '0')}/${year}`;
        };

        const getEntrance = async (ownerId) => {
            let list = [];
            const response = await service.list(loginStore.userId);
            response.data.data.forEach(res => {

                    list.push({
                        id: res.id,
                        description: res.source + " - " + res.type,
                        salary: res.currency + " " + res.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                        ownerId: res.owner.id,
                    })


            })
            setEntranceAllData(list);
            setEntranceData(list.filter(li => li.ownerId === ownerId));
        }
        const handleAdd = () => {
            const updateList = [...formStore.formList];
            updateList.push(
                {
                    entrance: formStore.form.entrance,
                    ownerId: formStore.form.ownerId,
                    salary: formStore.form.salary,
                    receiveDate: formStore.form.receiveDate,
                    referencePeriod: formStore.form.referencePeriod,
                    obs: formStore.form.obs
                }
            )
            formStore.setFormList(updateList);
            const transformedRows = updateList.map((data: any, index: number) => createData(
                entranceAllData.filter(en => en.id === data.entrance)[0].description,
                globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
                data.salary,
                data.receiveDate,
                data.referencePeriod,
                data.obs,
                actions(index),
                index
            ));
            setRows(transformedRows);
            reset();
        }

        const deleteItemFormList = async (i) => {
            let list = formStore.deleteItemFormList(i);

            const transformedRows = list.map((data: any, index: number) => createData(
                entranceAllData.filter(en => en.id === data.entrance)[0].description,
                globalStore.members.filter(mem => mem.id === data.ownerId)[0].name,
                data.salary,
                data.receiveDate,
                data.referencePeriod,
                data.obs,
                actions(index),
                index
            ));
            setRows(transformedRows);
        }

        const reset = () => {
            setPaymentRefer(getCurrentMonthYear());
            setSalary("");
            formStore.resetFormStore();
        }

        const handlePaymentRefer = (value) => {
            setPaymentRefer(value);
            formStore.setReferencePeriod(value);
        }

        const handleSalary = (value) => {
            if (value.includes(currency + ' ')) {
                setSalary(value);
                formStore.setSalaryReceive(value);
            }
        }

        const handleEntrance = (value) => {
            const salary = entranceData.filter(entrance => entrance.id.toString() === value.toString())[0].salary;
            setSalary(salary);
            formStore.setSalaryReceive(salary)
            const firstSpaceIndex = salary.indexOf(' ');
            setCurrency(salary.substring(0, firstSpaceIndex));
            formStore.setEntrance(value);
        }

        const handleOwner = (value) => {
            formStore.setOwnerId(value);
            getEntrance(value);
        }


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
                            value={formStore.form.ownerId}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.entrance}
                            data={entranceData}
                            disabled={!formStore.form.ownerId}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"description"}
                            getValue={(value) => handleEntrance(value)}
                            value={formStore.form.entrance}
                        />

                        <Input
                            label={Messages.titles.salaryValue}
                            disabled={!formStore.form.entrance}
                            width="200px"
                            getValue={(value) => handleSalary(value)}
                            inputValue={salary}
                            viewMode={false}
                            price={true}
                        />

                        <InputDataComponent
                            label={Messages.titles.dateReceive}
                            disabled={false}
                            width="200px"
                            getValue={(value) => formStore.setReceiveDate(value)}
                            viewMode={false}
                            inputValue={formStore.form.receiveDate}
                            disabledDates={[new Date()]}
                            before={true}
                        />

                    </div>
                    <div className="register-member">
                        <Input
                            label={Messages.titles.paymentRefer}
                            disabled={false}
                            width="200px"
                            getValue={(value) => handlePaymentRefer(value)}
                            inputValue={paymentRefer}
                            viewMode={false}
                            maskDate={true}
                            numericLimit={7}
                        />
                        <Input
                            label={Messages.titles.obs}
                            disabled={false}
                            width="418px"
                            getValue={(value) => formStore.setObs(value)}
                            inputValue={formStore.form.obs}
                            viewMode={false}
                            maskDate={false}
                            numericLimit={55}
                        />
                    </div>
                    <div className="register-member">
                        <div className="add-button-member">
                            <ButtonComponent
                                label={"+ " + Messages.titles.receive}
                                disabled={!formStore.form.entrance || !formStore.form.salary || !formStore.form.receiveDate || !formStore.form.ownerId}
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
                    </div>
                </div>

                {rows.length > 0 &&
                    <div className="register-member" style={{marginLeft: "18px"}}>
                        <TableComponent
                            columns={columns}
                            rows={rows}
                            pagination={false}
                            width={"80%"}
                        />
                    </div>
                }

            </div>
        );
    }
;
