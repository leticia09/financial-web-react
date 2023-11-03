import {IGroup} from "../../../../interfaces/group";

export const ValidateGroupForm = (form: IGroup): boolean => {
    let validate = false;
    let validateSpecific = false
    if(form.name === '') {
        validate = true;
    }

    form.specificGroups.forEach(fo => {
        if(fo.name === '') {
            validateSpecific = true;
        }
    })

    return validate || validateSpecific;
};