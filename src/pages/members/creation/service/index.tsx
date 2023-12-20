import {instance} from "../../../../services/Core/api/api";

export const RegisterMembersService = (axiosInstance: any = instance) => {
    const createMember = (payload) => {
        const url = '/member'
        return axiosInstance.post(url, payload);
    }

    return {
        createMember
    }
}