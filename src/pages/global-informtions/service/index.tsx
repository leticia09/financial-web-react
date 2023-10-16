// @ts-ignore
import {instance} from "../../../services/Core/api/api.tsx";

export const GlobalService = (axiosInstance: any = instance) => {
    const getModality = () => {
        const endPoint = '/modality/';
        return axiosInstance.get(endPoint);
    }

    return {
        getModality
    }
}