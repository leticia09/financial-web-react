import {instance} from "../../../services/Core/api/api";


export const BankDataManagementService = (axiosInstance: any = instance) => {
    const getRegisterBank = (id: number) => {
        const endPoint = '/register-bank/' + id;
        return axiosInstance.get(endPoint);
    }

    const saveRegisterBank = (payload: any) => {
        const url = '/register-bank';
        return axiosInstance.post(url, payload);
    }

    const getRegisterBankById = (authId: number, id: any) => {
        const endPoint = '/register-bank/' + authId + "/" + id;
        return axiosInstance.get(endPoint);
    }

    const exclusion = (id: number) => {
        const endPoint = '/register-bank/' + id;
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

    return {
        getRegisterBank,
        saveRegisterBank,
        getRegisterBankById,
        exclusion,
        exclusionAccount,
        exclusionCard
    }
}