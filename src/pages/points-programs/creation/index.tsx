import {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useLoginStore from "../../login/store/useLoginStore";
import {useLocation, useNavigate} from "react-router-dom";
import {ProgramPointForm} from "./form";
import usePointFormStore from "./store/usePointFormStore";
import {PointsService} from "../service";

export const CreateProgramPoint: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = usePointFormStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [urlType, setUrlType] = useState("");
    const navigate = useNavigate();
    const pointsService = PointsService();

    useEffect(() => {
        location.pathname.includes("cartao")
            ? setUrlType("card")
            : setUrlType("program");
        formStore.resetFormStore();
    }, []);

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        setIsLoading(true);

        formStore.formProgramList.forEach(form => {
            form.userAuthId = loginStore.userId;
        })

        try {
            const response = await pointsService.create(formStore.formProgramList);
            if (response.data.message === "Sucesso") {
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
                if(response.data.message === "PROGRAM_ALREADY_EXISTS") {
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

    const handleAdd = () => {
        const updateList = [...formStore.formProgramList];
        updateList.push(
            {
                id: null,
                program: '',
                value: '',
                pointsExpirationDate: null,
                index: updateList.length,
                userAuthId: loginStore.userId
            }
        )
        formStore.setPointFormList(updateList);
    }


    return (
        <Creation
            titles={Messages.titles.registerProgramPoint}
            Form={
                [
                    <ProgramPointForm />
                ]
            }
            titlesButton={Messages.titles.addProgram}
            save={save}
            disabledSaveButton={false}
            pathBack="/grupos/programa-pontos"
            toastMessage={toastMessage}
            severityType={severity}
            isLoading={isLoading}
            open={open}
            handleClose={handleClose}
            hasButton={urlType === 'program'}
            handleAddMember={handleAdd}
        />
    );

}