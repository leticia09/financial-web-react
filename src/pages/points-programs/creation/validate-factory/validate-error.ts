import {Messages} from "../../../../internationalization/message";

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
    }

};