import {FunctionComponent} from "react";
// @ts-ignore
import useFormBankStore from "../store/useFormBankStore.ts";
// @ts-ignore
import {Input} from "../../../../components/input/index.tsx";
// @ts-ignore
import {Messages} from "../../../../internationalization/message/index.ts";
// @ts-ignore
import {ButtonComponent} from "../../../../components/button/index.tsx";
import '../../../members/creation/form/memberForm.css'
// @ts-ignore
import {DropdownSingleSelect} from "../../../../components/dropdown/index.tsx";
import "./formBank.css"

interface IBankDataForm {
    accountForm: [];
}

const dataOwner = [{}]
export const BankDataForm: FunctionComponent = ({accountForm}: IBankDataForm) => {

    const formStore = useFormBankStore();

    const handleDeleteMember = (i) => {
        formStore.deleteItemFormList(i);
    }
//todo: formatar o input accountNumber para receber apenas números
    return (
        <div>
            <h3 className="title-bank">Banco</h3>
            <div className="register-member">

                <Input
                    label={Messages.titles.bank}
                    disabled={false}
                    width="200px"
                    //getValue={(value) => formStore.setFormListValue(i, 'name', value)}
                />



            </div>
            <h3  className="title-bank">Conta Bancária</h3>
            <div className="register-bank">

                <Input
                    label={Messages.titles.accountNumber}
                    disabled={false}
                    width="200px"
                    //getValue={(value) => formStore.setFormListValue(i, 'accounts', value)}
                />

                <DropdownSingleSelect
                    label={Messages.titles.owner}
                    data={dataOwner}
                    disabled={false}
                    width={"200px"}
                    //getValue={(value) => formStore.setFormListValue(i, 'owner', value)}
                />
            </div>

            <h3 className="title-bank">Cartão</h3>
            <div className="register-bank">

                <Input
                    label={Messages.titles.cardName}
                    disabled={false}
                    width="200px"
                    //getValue={(value) => formStore.setFormListValue(i, 'accounts', value)}
                />
                <Input
                    label={Messages.titles.finalCard}
                    disabled={false}
                    width="200px"
                    //getValue={(value) => formStore.setFormListValue(i, 'accounts', value)}
                />

                <DropdownSingleSelect
                    label={Messages.titles.modality}
                    data={dataOwner}
                    disabled={false}
                    width={"200px"}
                    //getValue={(value) => formStore.setFormListValue(i, 'owner', value)}
                />
            </div>
        </div>
    );
}