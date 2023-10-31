import {instance} from "../../../services/Core/api/api";

export const PointsService = (axiosInstance: any = instance) => {
    const create = (payload) => {
        const url = '/points'
        return axiosInstance.post(url, payload);
    }

    const transfer = (payload) => {
        const url = '/points/transfer'
        return axiosInstance.post(url, payload);
    }

    const get = (userId) => {
        const url = '/points/' + userId;
        return axiosInstance.get(url);
    }
    const getData = (userId) => {
        const url = '/points/programs-data/' + userId;
        return axiosInstance.get(url);
    }

    const updateStatus = (payload) => {
        const url = '/points/update-status'
        return axiosInstance.post(url, payload);
    }

    const use = (payload) => {
        const url = '/points/use'
        return axiosInstance.post(url, payload);
    }

    return {
        create,
        get,
        transfer,
        getData,
        updateStatus,
        use
    }
}