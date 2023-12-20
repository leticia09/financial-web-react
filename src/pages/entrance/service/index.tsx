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

    const getData = (userId, month, year) => {
        const url = '/entrance/data/' + userId + '/' + month + '/' + year;
        return axiosInstance.get(url);
    }

    const exclusion = (id: number) => {
        const endPoint = '/entrance/' + id;
        return axiosInstance.delete(endPoint);
    }

    return {
        getTypeSalary, edit, create, list, getData, listWithFilters, exclusion
    }
}