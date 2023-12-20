import {IMember} from "../../../../interfaces/member";


export const ValidateFormMember = (formList: IMember[]): boolean => {

    for (const form of formList) {
        if (form.name === '' || form.color === '' || form.name === null || form.color === null) {
            return true;
        }
    }
    return false;
};

export const ValidateFormMemberEdit = (form: IMember, currentForm: any): boolean => {
        return form.name === currentForm.name && form.color === currentForm.color && form.status === currentForm.status;
};
