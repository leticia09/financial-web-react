import {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useLoginStore from "../../login/store/useLoginStore";
import { useNavigate} from "react-router-dom";
import {ProgramPointForm} from "./form";
import {PointsService} from "../service";
import {IProgram} from "../../../interfaces/points-program";

import useScorePointStore from "./store/useScorePointStore";

export const CreateProgramPoint: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useScorePointStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const pointsService = PointsService();



    useEffect(() => {
        formStore.resetFormStore();
    }, []);

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };


    const handleAdd = () => {
        const updatedList: IProgram[] = [...formStore.formList];
        updatedList.push({
            id: null,
            program: '',
            value: '',
            pointsExpirationDate: null,
            index: updatedList.length,
            userAuthId: loginStore.userId,
            typeOfScore: '',
        });

        formStore.setFormList(updatedList);
    }

    const save = async () => {
        setIsLoading(true);
        
        formStore.formList.forEach(form => {
            form.userAuthId = loginStore.userId;
        })

        try {
            const response = await pointsService.create(formStore.formList);
            if (response.data.message === "Sucesso") {
                console.log('entrei aqui')
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);
                setIsLoading(false);

                setTimeout(() => {
                    setOpen(false);
                    navigate("/grupos/programa-pontos");
                }, 2000);

            } else {
                setOpen(true);
                setSeverity("error");
                if (response.data.message === "PROGRAM_ALREADY_EXISTS") {
                    setToastMessage(Messages.messages.programExists);
                } else if(response.data.message === "INVALID_EXPIRATION_DATE") {
                    setToastMessage(Messages.messages.invalidDate);
                }else if(response.data.message === "VALUE_IS_NULL") {
                    setToastMessage(Messages.messages.valueIsNull);
                } else {
                    setToastMessage(Messages.titles.errorMessage);
                }
                setIsLoading(false);

            }

        } catch (e) {
            setIsLoading(false);
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
        }
    }


    return (
        <Creation
            titles={Messages.titles.registerProgramPoint}
            Form={
                formStore.formList.map((program, i) => (
                    <ProgramPointForm
                        key={program.index}
                        i={i}
                        hasDelete={i > 0}
                    />
                ))
            }

            titlesButton={Messages.titles.addProgram}
            handleAddMember={handleAdd}
            save={save}
            pathBack="/grupos/programa-pontos"
            toastMessage={toastMessage}
            severityType={severity}
            isLoading={isLoading}
            open={open}
            disabledSaveButton={false}
            hasButton={true}
            handleClose={handleClose}
        />
    );

}