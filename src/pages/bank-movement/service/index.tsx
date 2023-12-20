import {instance} from "../../../services/Core/api/api";

export const MovementBankService = (axiosInstance: any = instance) => {
    const pay = (payload) => {
        const url = '/points'
        return axiosInstance.post(url, payload);
    }

    const receive = (payload, userAuth) => {
        const url = '/movement-bank/receive/' + userAuth
        return axiosInstance.post(url, payload);
    }

    const transfer = (payload) => {
        const url = '/movement-bank/transfer'
        return axiosInstance.post(url, payload);
    }

    const get = (userId) => {
        const url = '/movement-bank/' + userId;
        return axiosInstance.get(url);
    }
    const getData = (userId) => {
        const url = '/movement-bank/data/' + userId;
        return axiosInstance.get(url);
    }

    const updateStatus = (payload) => {
        const url = '/movement-bank/update-status'
        return axiosInstance.post(url, payload);
    }

    const use = (payload) => {
        const url = '/movement-bank/use'
        return axiosInstance.post(url, payload);
    }

    const exclusion = (id: number) => {
        const url = '/movement-bank/' +  id;
        return axiosInstance.delete(url);
    }

    return {
        pay,
        receive,
        get,
        transfer,
        getData,
        updateStatus,
        use,
        exclusion
    }
}