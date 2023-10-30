import {instance} from "../../../services/Core/api/api";

export const GlobalService = (axiosInstance: any = instance) => {
    const getModality = () => {
        const endPoint = '/modality/';
        return axiosInstance.get(endPoint);
    }

    const getBank = (authId) => {
        const endPoint = '/register-bank/' + authId;
        return axiosInstance.get(endPoint);
    }

    const getTypeOfScore = () => {
        const endPoint = 'points/type-of-score';
        return axiosInstance.get(endPoint);
    }

    const getProgram = (authId) => {
        const endPoint = 'points/programs/' + authId;
        return axiosInstance.get(endPoint);
    }

    return {
        getModality, getBank, getTypeOfScore, getProgram
    }
}