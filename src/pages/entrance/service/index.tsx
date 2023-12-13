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

    const create = (payload) => {
        const endPoint = '/entrance';
        return axiosInstance.post(endPoint, payload);
    }

    const listWithFilters = (authId: number, month, year) => {
        const endPoint = '/entrance/' + authId + "/" + month + "/" + year;
        return axiosInstance.get(endPoint);
    }

    const list = (authId: number) => {
        const endPoint = '/entrance/' + authId;
        return axiosInstance.get(endPoint);
    }

    const getData = (userId) => {
        const url = '/entrance/data/' + userId;
        return axiosInstance.get(url);
    }

    return {
        getTypeSalary, edit, create, list, getData, listWithFilters
    }
}