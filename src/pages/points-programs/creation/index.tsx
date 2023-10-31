import {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useLoginStore from "../../login/store/useLoginStore";
import { useNavigate} from "react-router-dom";
import {ProgramPointForm} from "./form";
import {PointsService} from "../service";
import {IProgram} from "../../../interfaces/points-program";

import useScorePointStore from "./store/useScorePointStore";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {GlobalService} from "../../global-informtions/service";

export const CreateProgramPoint: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const formStore = useScorePointStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const pointsService = PointsService();
    const globalService = GlobalService();


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

        try {
            const response = await pointsService.create(formStore.formList);
            if (response.data.message === "Sucesso") {
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);
                setIsLoading(false);
                const programResponse = await globalService.getProgram(response.data.data.id);
                globalStore.setProgram(programResponse.data.data);

                setTimeout(() => {
                    setOpen(false);
                    navigate("/grupos/programa-pontos");
                }, 2000);

            } else {
                setOpen(true);
                setSeverity("error");
                if (response.data.message === "PROGRAM_ALREADY_EXISTS") {
                    setToastMessage(Messages.messages.programExists);
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