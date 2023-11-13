import {IMember} from "../../../../interfaces/member";


export const ValidateFormMember = (formList: IMember[]): boolean => {

    for (const form of formList) {
        if (form.name === '' || form.color === '' || form.name === null || form.color === null) {
            return true;
        }
    }
    return false;
};