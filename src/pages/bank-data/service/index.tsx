// @ts-ignore
import {instance} from "../../../services/Core/api/api.tsx";

export const BankDataManagementService = (axiosInstance: any = instance) => {
    const getMembers = (id) => {
        const endPoint = '/bank/' + id;
        return axiosInstance.get(endPoint);
    }

    return {
        getMembers
    }
}