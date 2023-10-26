import {instance} from "../../../services/Core/api/api";

export const PointsService = (axiosInstance: any = instance) => {
    const create = (payload) => {
        const url = '/points'
        return axiosInstance.post(url, payload);
    }

    const get = (userId) => {
        const url = '/points/' + userId;
        return axiosInstance.get(url);
    }

    return {
        create,
        get
    }
}