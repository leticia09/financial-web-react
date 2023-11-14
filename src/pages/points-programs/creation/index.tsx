import {FunctionComponent, useEffect, useState} from "react";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useLoginStore from "../../login/store/useLoginStore";
import {useNavigate} from "react-router-dom";
import {ProgramPointForm} from "./form";
import {PointsService} from "../service";
import {IProgram} from "../../../interfaces/points-program";
import useScorePointStore from "./store/useScorePointStore";
import {ValidateFormCreate} from "./validate-factory/validateForms";
import {ValidateError} from "../../../validate-error/validate-error";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {MembersManagementService} from "../../members/service";

export const CreateProgramPoint: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useScorePointStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const pointsService = PointsService();
    const membersManagementService = MembersManagementService();
    const globalStore = useGlobalStore();

    useEffect(() => {
        const fetchData = async () => {
            const memberResponse = await membersManagementService.getMembersDropdown(loginStore.userId);
            globalStore.setMember(memberResponse.data.data);
        };
        fetchData();
        formStore.resetFormStore();
        formStore.setFormList([
            {
                id: 0,
                program: '',
                value: 0,
                pointsExpirationDate: null,
                index: 0,
                userAuthId: 0,
                typeOfScore: '',
                ownerId: 0
            }
        ]);
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
            value: 0,
            pointsExpirationDate: null,
            index: updatedList.length,
            userAuthId: loginStore.userId,
            typeOfScore: '',
            ownerId: 0
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
            setSeverity(response.data.severity);
            setOpen(true);
            setToastMessage(ValidateError(response.data.message));

            setTimeout(() => {
                setOpen(false);
                setIsLoading(false);
                navigate("/grupos/programa-pontos");
            }, 2000);

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
            disabledSaveButton={ValidateFormCreate(formStore.formList)}
            save={save}
            pathBack="/grupos/programa-pontos"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            hasButton={true}
            handleClose={handleClose}
        />
    );

}