import {FunctionComponent, useEffect, useState} from "react";
import '../../members/creation/creationMember.css'
import {useNavigate} from "react-router-dom";
import useLoginStore from "../../login/store/useLoginStore";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {ValidateError} from "../../../validate-error/validate-error";
import useMoneyStore from "../store/moneyStore";
import {MoneyForm} from "./form/moneyForm";
import {MoneyService} from "../service";


export const MoneyCreation: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();


    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const formStore = useMoneyStore();
    const service = MoneyService();

    useEffect(() => {
        formStore.setFormList([
            {
                id: null,
                index: 0,
                userAuthId: 0,
                currency: '',
                value: '',
                ownerId: 0
            }
        ])
        formStore.resetFormStore();
    }, []);

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleAddMember = () => {
        const updateList = [...formStore.formList];
        updateList.push(
            {
                id: null,
                index: updateList.length,
                userAuthId: loginStore.userId,
                currency: '',
                value: '',
                ownerId: 0
            }
        )
        formStore.setFormList(updateList);
    }

    const saveMember = async () => {
        setIsLoading(true);

        formStore.formList.forEach(form => {
            form.userAuthId = loginStore.userId;
        })

        try {
            let payload = [];
            formStore.formList.forEach(fo => {
                payload.push({
                    currency: globalStore.currency.filter(c => c.id === fo.currency)[0].description,
                    value: fo.value,
                    index: fo.index,
                    userAuthId: fo.userAuthId,
                    ownerId: fo.ownerId

                })
            })
            const response = await service.create(payload);
            setOpen(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));

            setTimeout(() => {
                setOpen(false);
                if (response.data.severity === "success")
                    navigate("/grupos/dados-bancarios");
                setIsLoading(false);
            }, 3000);

        } catch (e) {
            setIsLoading(false);
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
        }
    }

    return (
        <Creation
            titles={Messages.titles.registerMoney}
            Form={
                formStore.formList.map((member, i) => (
                    <MoneyForm
                        key={i}
                        i={i}
                        hasDelete={i > 0}
                    />
                ))
            }
            titlesButton={Messages.titles.addMoney}
            handleAddMember={handleAddMember}
            save={saveMember}
            pathBack="/grupos/dados-bancarios"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            disabledSaveButton={formStore.formList.length === 0}
            hasButton={true}
            handleClose={handleClose}
        />
    );
}