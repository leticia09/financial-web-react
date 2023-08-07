// @ts-ignore
import {instance} from "../../../services/Core/api/api.tsx";

export const RegisterAccountService = (axiosInstance: any = instance) => {
    const auth = (payload) => {
        const url = '/user-auth'
        return axiosInstance.post(url, payload);
    }

    return {
        auth
    }
}