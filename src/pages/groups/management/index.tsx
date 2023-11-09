import React, {FunctionComponent, useEffect, useState} from "react";
import * as AiIcons from "react-icons/ai";
import useLoginStore from "../../login/store/useLoginStore";
import {Management} from "../../../components/management";
import "../../bank-data/management/bankData.css"
import {IColumns} from "../../../interfaces/table";
import {BulletComponent} from "../../../components/bullet";
import {Messages} from "../../../internationalization/message";
import {GroupsService} from "../service";
import {ModalComponent} from "../../../components/modal";
import {ModalGroupForm} from "./modal";
import useGroupStore from "../creation/store/useGroupStore";
import {ValidateError} from "../../../validate-error/validate-error";

const columns: IColumns[] = [
    {
        id: "name",
        label: "Grupo Macro",
        minWidth: 70,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "specificNumbers",
        label: "Grupos Específicos",
        minWidth: 70,
        align: "right",
        format: (value) => value.toFixed(2),
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
    const {id, name, specificGroups, status} = user;
    const statusBullet = status === 'ACTIVE' ? (
        <BulletComponent color="green" showLabel={true} label={'Ativo'}/>
    ) : status === 'INACTIVE' ? (
        <BulletComponent color="red" showLabel={true} label={'Inativo'}/>
    ) : null;

    const names = specificGroups.map(obj => obj.name);
    return {id, name, specificNumbers: names.join(', '), status: statusBullet, actions, key: index};
}

type RowType = {
    id: number;
    name: string;
    status: string;
    actions: React.ReactNode[];
};


export const Groups: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useGroupStore();
    const [rows, setRows] = useState<RowType[]>([]);
    const service = GroupsService();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModalExclusion, setOpenModalExclusion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleOpen = (index) => {
        setCurrentIndex(index);
        setOpen(true);
    };

    const handleOpenModalExclusion = (index) => {
        setCurrentIndex(index);
        setOpenModalExclusion(true);
    }

    const actions = (index) => (
        <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
            <AiIcons.AiOutlineEdit className="icon_space" size={18} onClick={() => handleOpen(index)}/>
            <AiIcons.AiOutlineDelete className="icon_delete" size={18} onClick={() => handleOpenModalExclusion(index)}/>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            getData();
        }

        fetchData().then();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await service.getData(loginStore.userId);
            const transformedRows = res.data.data.map((user: any, index: number) => createData(user, actions(index), index));

            setRows(transformedRows);
            let list = [];
            for (let i = 0; i < res.data.data.length; i++) {
                list.push(res.data.data[i])
                formStore.setFormListEdit(list);
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Error', error);
        }
    }

    const handleClose = () => {
        getData();
        setOpen(false);
    };

    const handleCloseExclusion = () => {
        setOpenModalExclusion(false);
    }

    const save = async () => {
        setIsLoading(true);
        try {
            const response = await service.edit(formStore.formListEdit[currentIndex]);
            if (response.data.message === "success") {
                setOpenToast(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);
                setTimeout(() => {
                    setOpen(false);
                    getData();
                }, 2000);

            } else {
                setOpen(true);
                setSeverity("error");
                setToastMessage(ValidateError(response.data.message));
                setIsLoading(true);
            }

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
            setIsLoading(true);
        }

    };

    const exclusion = async () => {
        setIsLoading(true);
        try {
            const response = await service.exclusion(formStore.formListEdit[currentIndex].id);
            if (response.data.message === "success") {
                setOpenToast(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);
                setTimeout(() => {
                    setOpenModalExclusion(false);
                    setIsLoading(false);
                    getData();
                }, 2000);
            }

        } catch (e) {
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
            setIsLoading(false);
        }

    };

    return (
        <>
            <Management
                title={Messages.titles.groups}
                rows={rows}
                arrayHeader={columns}
                path="/grupos/grupos/cadastro"
                showLineProgress={isLoading}
            />
            {open && !openModalExclusion &&
                <ModalComponent
                    openModal={open}
                    setOpenModal={handleClose}
                    label={formStore.formListEdit[currentIndex].name}
                    getValue={save}
                    Form={
                        [
                            <ModalGroupForm
                                index={currentIndex}
                            />
                        ]
                    }
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />}

            {openModalExclusion &&
                <ModalComponent
                    openModal={openModalExclusion}
                    setOpenModal={handleCloseExclusion}
                    label={Messages.titles.exclusion}
                    getValue={exclusion}
                    Form={
                        [
                            <div>
                                <div style={{padding: "10px 10px 0 10px"}}>{Messages.messages.confirmExclusion}</div>
                                <div style={{padding: "10px 10px 0 10px", color: "red"}}>{Messages.messages.confirm}</div>
                            </div>
                        ]
                    }
                    toastMessage={toastMessage}
                    severityType={severity}
                    openToast={openToast}
                />}


        </>
    );
}