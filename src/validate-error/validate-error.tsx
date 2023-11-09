import {Messages} from "../internationalization/message";
import {readUsedSize} from "chart.js/helpers";

export const ValidateError = (message: any): string => {

    switch (message) {
        case "INVALID_TRANSACTION":
            return Messages.messages.invalidTransaction;

        case "INSUFFICIENT_ORIGIN_BALANCE":
            return Messages.messages.insufficientOrigin;

        case "INSUFFICIENT_DESTINY_BALANCE":
            return Messages.messages.insufficientDestiny;

        case "INVALID_EXPIRATION_DATE":
            return Messages.messages.invalidDate;

        case "PROGRAM_ALREADY_EXISTS":
            return Messages.messages.programExists;

        case "VALUE_IS_NULL":
            return Messages.messages.valueIsNull;

        case "PROGRAM_IS_EQUAL":
            return Messages.messages.programIsEqual;

        case "MACRO_GROUP_NAME_ALREADY_EXISTS":
            return Messages.messages.macroNameExists;

        case "SPECIFIC_GROUP_NAME_ALREADY_EXISTS":
            return Messages.messages.specificNameExists;

        case "REQUIRED_FIELDS_MISSING":
            return Messages.messages.requiredFields;

        case "BANK_NAME_ALREADY_EXISTS":
            return Messages.messages.bankNameAlreadyExists;

        case "DUPLICATE_ACCOUNT_NUMBER":
            return Messages.messages.duplicateAccountNumber;

        case "DUPLICATE_CARD_NUMBER":
            return Messages.messages.duplicateCardNumber;
        case "NOME_ALREADY_EXISTS":
            return Messages.messages.nameExists;

        case "NOME_IS_EMPTY":
            return Messages.messages.requiredFields;

        case "success":
            return Messages.messages.operationSuccess;

        default:
            return Messages.titles.errorMessage;
    }
};