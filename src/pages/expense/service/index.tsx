import {instance} from "../../../services/Core/api/api";

export const ExpenseService = (axiosInstance: any = instance) => {

    const create = (payload) => {
        const endPoint = '/expense';
        return axiosInstance.post(endPoint, payload);
    }

    const listWithFilters = (authId: number, month, year) => {
        const endPoint = '/expense/' + authId + "/" + month + "/" + year;
        return axiosInstance.get(endPoint);
    }

    const list = (authId: number) => {
        const endPoint = '/expense/' + authId;
        return axiosInstance.get(endPoint);
    }

    const getData = (userId, month, year) => {
        const url = '/expense/data/' + userId + '/' + month + '/' + year;
        return axiosInstance.get(url);
    }

    return {
         create, list, getData, listWithFilters
    }
}