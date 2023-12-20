import {instance} from "../../../services/Core/api/api";


export const TicketsService = (axiosInstance: any = instance) => {
    const getTicket = (authId: number) => {
        const endPoint = '/financial-entity/' + authId;
        return axiosInstance.get(endPoint);
    }

    const create = (payload: any) => {
        const url = '/financial-entity';
        return axiosInstance.post(url, payload);
    }


    const exclusion = (id: number) => {
        const endPoint = '/financial-entity/' + id;
        return axiosInstance.delete(endPoint);
    }


    const edit = (payload: any) => {
        const url = '/financial-entity/';
        return axiosInstance.patch(url, payload);
    }


    return {
        getTicket,
        create,
        exclusion,
        edit
    }
}