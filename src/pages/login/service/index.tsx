// @ts-ignore
import {instance} from "../../../services/Core/api/api.tsx";

export const LoginService = (axiosInstance: any = instance) => {
    const auth = (payload) => {
        const url = '/user-auth/validate'
        return axiosInstance.post(url, payload);
    }

    return {
        auth
    }
}