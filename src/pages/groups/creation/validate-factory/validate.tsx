import {IGroup} from "../../../../interfaces/group";

export const ValidateGroupForm = (form: IGroup): boolean => {

    let validate = false;
    let validateSpecific = false
    if (form) {
        if (form.name === '') {
            validate = true;
        }
        if (form.specificGroups) {
            form.specificGroups.forEach(fo => {
                if (fo.name === '') {
                    validateSpecific = true;
                }
            })
        }
    }


    return validate || validateSpecific;
};

export const ValidateGroupFormEdit = (form: any, formCurrent: any): boolean => {
    let validate = false;
    let validateSpecific = true
    if (form && formCurrent) {
        let status = form.status;
        if (form.status !== "ACTIVE") {
            status = formCurrent.status === "ACTIVE" ? 1 : 2;
        }

        if (form.name === formCurrent.name && form.status === status) {
            validate = true;
        }
        if (form.specificGroups && formCurrent.specificGroups) {
            if (form.specificGroups.length === formCurrent.specificGroups.length) {
                for (let i = 0; i < formCurrent.specificGroups.length; i++) {
                    if (form.specificGroups[i].name !== formCurrent.specificGroups[i].name) {
                        validateSpecific = false;
                        break;
                    }
                }
            } else {
                validateSpecific = false;
            }
        }

    }

    return validate && validateSpecific;
};