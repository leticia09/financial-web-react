import React, {FunctionComponent, useEffect, useState} from "react";
import * as AiIcons from "react-icons/ai";
import useLoginStore from "../../login/store/useLoginStore";
import {Management} from "../../../components/management";
import "../../bank-data/management/bankData.css"
import {IColumns} from "../../../interfaces/table";
import {BulletComponent} from "../../../components/bullet";
import {ModalComponent} from "../../../components/modal";
import {ModalGroupForm} from "../../groups/management/modal";
import {Messages} from "../../../internationalization/message";
import useFormStore from "../creation/store/useFormStore";
import {MembersManagmentService} from "../service";
import {MemberForm} from "../creation/form";
import {ValidateError} from "../../../validate-error/validate-error";

const columns: IColumns[] = [
    {
        id: "name",
        label: "Nome",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "status",
        label: "Status",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
    },
    {
        id: "actions",
        label: "Ações",
        minWidth: 70,
        width: 100,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];

function createData(user, actions, index) {
    const {id, name, status} = user;
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
    ) : status === 'INACTIVE' ? (
        <BulletComponent color="red" showLabel={true} label={'Inativo'}/>
    ) : null;
    return {id, name, status: statusBullet, actions, key: index};
}

type RowType = {
    id: number;
    name: string;
    status: string;
    actions: React.ReactNode[];
};


export const Members: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormStore();
    const service = MembersManagmentService()
    const [rows, setRows] = useState<RowType[]>([]);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModalExclusion, setOpenModalExclusion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);

    const actions = (index) => (
        <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => handleOpenModalEdit(index)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => handleOpenModalExclusion(index)}/>
        </div>
    );

    const handleOpenModalEdit = (index) => {
        setCurrentIndex(index);
        setOpenModalEdit(true);
    }

    const handleOpenModalExclusion = (index) => {
        setCurrentIndex(index);
        setOpenModalExclusion(true);
    }
    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const handleCloseExclusion = () => {
        setOpenModalExclusion(false);
    }


    useEffect(() => {
        const fetchData = async () => {
            getData();
        }
        fetchData().then();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await service.getMembers(loginStore.userId);
            const transformedRows = response.data.data.map((user: any, index: number) => createData(user, actions(index), index));
            setRows(transformedRows);

            let list = [];
            for (let i = 0; i < response.data.data.length; i++) {
                list.push(response.data.data[i])
                formStore.setFormList(list);
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Error', error);
        }
    }

    const edit = async () => {
        setIsLoading(true);
        try {
            const payload = {
                id: formStore.formList[currentIndex].id,
                name: formStore.formList[currentIndex].name,
                status: null,
                userAuthId: formStore.formList[currentIndex].userAuthId

            }
            const response = await service.edit(payload);

            setOpenToast(true);
            setSeverity(response.data.message);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                setOpenModalEdit(false);
                getData();
                setIsLoading(false);
            }, 2000);

        } catch (e) {
            setOpenModalEdit(false);
            setIsLoading(false);
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
        }

    };

    const exclusion = async () => {
        setIsLoading(true);
        try {
            const response = await service.exclusion(formStore.formList[currentIndex].userAuthId, formStore.formList[currentIndex].id);
            setOpenToast(true);
            setSeverity(response.data.message);
            setToastMessage(ValidateError(response.data.message));
            setTimeout(() => {
                setOpenModalExclusion(false);
                setOpenToast(false);
                setIsLoading(false);
                getData();
            }, 2000);

        } catch (e) {
            setOpenModalExclusion(false);
            setIsLoading(false);
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
        }

    };

    return (
        <>
            <Management
                title="Membros"
                rows={rows}
                arrayHeader={columns}
                path="/grupos/membros/cadastro"
                showLineProgress={isLoading}
            />

            <ModalComponent
                openModal={openModalEdit}
                setOpenModal={handleCloseEdit}
                label={formStore.formList[currentIndex].name}
                getValue={edit}
                Form={
                    [
                        <MemberForm
                            key={currentIndex}
                            i={currentIndex}
                            hasDelete={false}
                        />
                    ]
                }
            />

            <ModalComponent
                openModal={openModalExclusion}
                setOpenModal={handleCloseExclusion}
                label={Messages.titles.exclusion}
                getValue={exclusion}
                Form={
                    [
                        <div>
                            <div style={{padding: "10px 10px 0 10px"}}>{Messages.messages.confirm}</div>
                        </div>
                    ]
                }
                toastMessage={toastMessage}
                severityType={severity}
                openToast={openToast}
            />
        </>
    );
}