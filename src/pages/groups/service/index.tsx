import {instance} from "../../../services/Core/api/api";

export const GroupsService = (axiosInstance: any = instance) => {
    const create = (payload) => {
        const url = '/group'
        return axiosInstance.post(url, payload);
    }

    const getData = (authId) => {
        const url = '/group/' + authId;
        return axiosInstance.get(url);
    }

    const exclusion = (authId) => {
        const url = '/group/' + authId;
        return axiosInstance.delete(url);
    }

    const edit = (payload) => {
        const url = '/group'
        return axiosInstance.patch(url, payload);
    }

    return {
        create, getData, edit, exclusion
    }
}