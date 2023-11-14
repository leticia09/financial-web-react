import {instance} from "../../../services/Core/api/api";

export const MembersManagementService = (axiosInstance: any = instance) => {
    const getMembers = (id: number) => {
        const endPoint = '/member/' + id;
        return axiosInstance.get(endPoint);
    }

    const getMembersDropdown = (id) => {
        const endPoint = '/member/dropdown/' + id;
        return axiosInstance.get(endPoint);
    }

    const edit = (payload) => {
        const endPoint = '/member/';
        return axiosInstance.patch(endPoint, payload);
    }

    const exclusion = (authId: number, id: number) => {
        const url = '/member/' + authId + "/" + id;
        return axiosInstance.delete(url);
    }

    return {
        getMembers, edit, exclusion, getMembersDropdown
    }
}