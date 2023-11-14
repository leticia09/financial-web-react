import {instance} from "../../../services/Core/api/api";


export const BankDataManagementService = (axiosInstance: any = instance) => {
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
        getRegisterBank,
        saveRegisterBank,
        getRegisterBankById,
    }
}