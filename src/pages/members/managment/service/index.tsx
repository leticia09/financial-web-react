// @ts-ignore
import {instance} from "../../../../services/Core/api/api.tsx";

export const MembersManagmentService = (axiosInstance: any = instance) => {
    const getMembers = (id) => {
        const endPoint = '/member/' + id;
        return axiosInstance.get(endPoint);
    }

    return {
        getMembers
    }
}