import {instance} from "../../../services/Core/api/api";


export const MoneyService = (axiosInstance: any = instance) => {
    const getMoney = (authId: number) => {
        const endPoint = '/money/' + authId;
        return axiosInstance.get(endPoint);
    }

    const create = (payload: any) => {
        const url = '/money';
        return axiosInstance.post(url, payload);
    }

    const getRegisterBankById = (authId: number, id: any) => {
        const endPoint = '/register-bank/' + authId + "/" + id;
        return axiosInstance.get(endPoint);
    }

    const exclusion = (id: number) => {
        const endPoint = '/money/' + id;
        return axiosInstance.delete(endPoint);
    }

    const exclusionAccount = (id: number) => {
        const endPoint = '/register-bank/account/' + id;
        return axiosInstance.delete(endPoint);
    }

    const exclusionCard = (id: number) => {
        const endPoint = '/register-bank/card/' + id;
        return axiosInstance.delete(endPoint);
    }

    const edit = (payload: any) => {
        const url = '/money/';
        return axiosInstance.patch(url, payload);
    }

    const editAccount = (payload: any) => {
        const url = '/register-bank/account/';
        return axiosInstance.patch(url, payload);
    }

    const editCard = (payload: any) => {
        const url = '/register-bank/card/';
        return axiosInstance.patch(url, payload);
    }

    return {
        getMoney,
        create,
        getRegisterBankById,
        exclusion,
        exclusionAccount,
        exclusionCard,
        editAccount,
        editCard,
        edit
    }
}