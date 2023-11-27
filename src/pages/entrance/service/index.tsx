import {instance} from "../../../services/Core/api/api";

export const EntranceService = (axiosInstance: any = instance) => {
    const getTypeSalary = (id: number) => {
        const endPoint = '/type-salary/' + id;
        return axiosInstance.get(endPoint);
    }

    const edit = (payload) => {
        const endPoint = '/type-salary/';
        return axiosInstance.post(endPoint, payload);
    }

    return {
        getTypeSalary, edit
    }
}