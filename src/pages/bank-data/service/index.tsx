// @ts-ignore
import {instance} from "../../../services/Core/api/api.tsx";

export const BankDataManagementService = (axiosInstance: any = instance) => {
    const getMembers = (id) => {
        const endPoint = '/member/' + id;
        return axiosInstance.get(endPoint);
    }

    const getRegisterBank = (id) => {
        const endPoint = '/register-bank/' + id;
        return axiosInstance.get(endPoint);
    }

    const saveRegisterBank = (payload) => {
        const url = '/register-bank';
        return axiosInstance.post(url, payload);
    }

    const getRegisterBankById = (authId, id) => {
        const endPoint = '/register-bank/' + authId + "/" + id;
        return axiosInstance.get(endPoint);
    }

    return {
        getMembers,
        getRegisterBank,
        saveRegisterBank,
        getRegisterBankById
    }
}