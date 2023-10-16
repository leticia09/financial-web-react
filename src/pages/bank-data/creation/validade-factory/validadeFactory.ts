import {IBankData, ICard} from "../../../../interfaces/bankData";

export const ValidateForm = (formList: IBankData) => {
    let errors: boolean = false;

    if (!formList.name) {
        errors = true;
    }

    if(formList.accounts && formList.accounts.length > 0) {
        formList.accounts.forEach((account, accountIndex) => {

            if (!account.accountNumber || !account.owner) {
                errors = true;
            }

            if(account.cards && account.cards.length > 0) {
                account.cards.forEach((card, cardIndex) => {
                    errors = ValidateCard(card);
                });
            } else {
                errors = true;
            }

        });
    } else {
        errors = true;
    }

    return errors;
};

export const ValidateCard = (card: ICard) => {

    let errors: boolean = false;

    if (!card.name || !card.owner || !card.finalNumber) {
        errors = true;
    }

    if(!card.modality) {
        errors = true;
    } else {
        if(card.modality.toString() === "1"
            || card.modality.toString() === "3") {

            if(!card.dueDate || !card.closingDate) {
                errors = true;
            }
        }
    }

    return errors;
}
