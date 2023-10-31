import {IProgram, ITransfer} from "../../../../interfaces/points-program";

export const ValidateFormCreate = (formList: IProgram[]): boolean => {

    for (const form of formList) {
        if (form.program === '' || form.typeOfScore === '' || form.value === 0) {
            return true;
        }
    }

    return false;
};

export const ValidateFormTransfer = (form: ITransfer): boolean => {
    return form.originProgramId === 0 || form.destinyProgramId === 0 || form.originValue === 0 || form.quantity === 0 || !form.quantity;
};

export const ValidateFormUse = (message: any): boolean => {
    let errors: boolean = false;

    return errors;

};