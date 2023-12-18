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

    const getEntrance = (authId) => {
        const endPoint = 'entrance/' + authId;
        return axiosInstance.get(endPoint);
    }

    const getStatus = () => {
        const endPoint = 'points/status';
        return axiosInstance.get(endPoint);
    }

    const getProgram = (authId) => {
        const endPoint = 'points/programs/' + authId;
        return axiosInstance.get(endPoint);
    }

    const getProgramById = (id) => {
        const endPoint = 'points/program/' + id;
        return axiosInstance.get(endPoint);
    }

    const getGroups = (authId) => {
        const url = '/group/' + authId;
        return axiosInstance.get(url);
    }

    const getExpense = (authId: number) => {
        const endPoint = '/expense/' + authId;
        return axiosInstance.get(endPoint);
    }

    return { getModality, getBank, getTypeOfScore, getProgram, getStatus, getProgramById, getEntrance, getGroups, getExpense }
}