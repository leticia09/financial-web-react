import React, {FunctionComponent, useEffect, useState} from "react";
import useFormBankStore from "../store/useFormBankStore";
import {Input} from "../../../../components/input";
import {Messages} from "../../../../internationalization/message";
import {ButtonComponent} from "../../../../components/button";
import '../../../members/creation/form/memberForm.css'
import {DropdownSingleSelect} from "../../../../components/dropdown";
import "./formBank.css"
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import {ValidateCard} from "../validade-factory/validadeFactory";
import {BankDataManagementService} from "../../service";
import useLoginStore from "../../../login/store/useLoginStore";
import {useParams} from 'react-router-dom';
import {IAccount} from "interfaces/bankData";
import {FormControlLabel, Switch} from "@mui/material";


export const BankDataForm: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormBankStore();
    const globalStore = useGlobalStore();
    const [numberAccount, setNumberAccount] = useState(null);
    const [accountOwner, setAccountOwner] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [account, setAccount] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [cardOwner, setCardOwner] = useState(null);
    const [finalCard, setFinalCard] = useState(null);
    const [cardModality, setCardModality] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [closingDate, setClosingDate] = useState(null);
    const {id} = useParams();
    const bankDataManagementService = BankDataManagementService();
    const [bankName, setBankName] = useState(null);
    const [hasScore, setScore] = useState(false);

    const days = [];

    useEffect(() => {
        formStore.resetAccounts();
        formStore.setRows([]);
        resetFields();
        setScore(false);
        resetCardFields();
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await bankDataManagementService.getRegisterBankById(loginStore.userId, id);
                    fillForm(response.data.data);
                } catch (error) {
                    console.log('Error', error);
                }
            }
            fetchData().then();
        } else {
            formStore.setFormType("CREATE");
        }
    }, []);

    for (let i = 1; i <= 31; i++) {
        days.push({id: i, name: i});
    }

    const fillForm = (form) => {
        setBankName(form.name);
        form.accounts.forEach((account: IAccount) => {
            formStore.addAccount(account);
        })

        transformDataToRows(form);
    }
    const handleAccountBank = (value) => {
        setNumberAccount(value);
    }
    const handleAccount = (value) => {
        setAccount(value);
    }
    const handleAccountOwner = (value) => {
        setAccountOwner(value);
    }
    const addAccount = () => {
        if (formStore.formList.accounts.length <= 2) {
            formStore.addAccount({
                label: null,
                accountNumber: numberAccount,
                owner: globalStore.members.filter(member => member.id === accountOwner)[0].name,
                cards: null,
                index: formStore.formList.accounts.length
            });
            resetFields();
        } else {
            setShowComment(true);
            resetFields();
        }
    };

    const resetFields = () => {
        setNumberAccount('');
        setAccountOwner('');
    };

    const handleCardName = (value: any) => {
        setCardName(value);
    }

    const handleCardOwner = (value: any) => {
        setCardOwner(value);
    }

    const handleFinalCard = (value: any) => {
        setFinalCard(value);
    }

    const handleCardModality = (value: any) => {
        setCardModality(value);
    }

    const handleDueDate = (value: any) => {
        setDueDate(value);
    }

    const handleClosingDate = (value: any) => {
        setClosingDate(value);
    }

    const handleChangeScore = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScore(event.target.checked);
    };

    const transformDataToRows = (formList) => {
        const rows = formList.accounts.map((account) => {
            return account.cards.map((card) => ([
                {label: card.name},
                {label: account.owner,},
                {label: card.finalNumber,},
                {label: card.modality,},
                {label: card.closingDate,},
                {label: card.dueDate,}
            ]));
        });

        formStore.setRows(rows);
    }

    const addCard = () => {
        if (account !== null) {
            const newCard = {
                name: cardName,
                owner: globalStore.members.filter(member => member.id === cardOwner)[0].name,
                finalNumber: parseInt(finalCard),
                modality: globalStore.modality.filter(modality => modality.id === cardModality)[0].name,
                closingDate: closingDate,
                dueDate: dueDate,
                index: formStore.formList.accounts[account].cards.length,
            };
            formStore.addCard(newCard, account);
            transformDataToRows(formStore.formList);
            resetCardFields();
        }
    };

    const resetCardFields = () => {
        setCardName('');
        setCardOwner({id: ''});
        setFinalCard('');
        setCardModality(null);
        setClosingDate(null);
        setDueDate(null);
        setAccount({id: ''});
    }

    return (
        <div>
            <h3 className="title-bank">Banco</h3>
            <div className="register-member">
                <Input
                    label={Messages.titles.bank}
                    disabled={formStore.formType === "VIEW"}
                    width="200px"
                    getValue={(value) => formStore.setBankNameFormList(value)}
                    inputValue={bankName}
                    viewMode={formStore.formType === "VIEW"}
                />
            </div>
            <h3 className="title-bank">{Messages.titles.account}
                {showComment && <span className="title-bank-comment"> {Messages.messages.notAllowedMoreThan}</span>}
            </h3>
            {formStore.formType === "CREATE" &&
                <div className="register-bank">
                    <Input
                        label={Messages.titles.accountNumber}
                        disabled={false}
                        width="200px"
                        getValue={(value) => handleAccountBank(value)}
                        inputValue={numberAccount}
                        maskNumeric={true}
                    />

                    <DropdownSingleSelect
                        label={Messages.titles.owner}
                        data={globalStore.members}
                        disabled={false}
                        width={"200px"}
                        idProperty={"id"}
                        descriptionProperty={"name"}
                        getValue={(value) => handleAccountOwner(value)}
                        value={accountOwner}
                    />
                </div>
            }
            {formStore.formType === "CREATE" &&
                <div className="register-bank">
                    <div className="register-bank-add-button">
                        <ButtonComponent
                            label={Messages.titles.addAccount}
                            disabled={!numberAccount || !accountOwner}
                            width="140px"
                            height="30px"
                            cursor="pointer"
                            borderRadius="4px"
                            color="white"
                            background="#46ba52"
                            border="none"
                            padding="2px"
                            marginBottom="20px"
                            fontWeight="400"
                            action={addAccount}/>
                    </div>
                </div>
            }
            {formStore.formList.accounts && formStore.formList.accounts.length > 0 && formStore.formType === "CREATE" && (
                <div>
                    <h3 className="title-bank">Cartão</h3>
                    <div className="register-bank">

                        <Input
                            label={Messages.titles.cardName}
                            disabled={false}
                            width="200px"
                            getValue={(value) => handleCardName(value)}
                            inputValue={cardName}
                        />
                        <DropdownSingleSelect
                            label={Messages.titles.responsible}
                            data={globalStore.members}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"name"}
                            getValue={(value) => handleCardOwner(value)}
                            value={cardOwner}
                        />
                        <Input
                            label={Messages.titles.finalCard}
                            disabled={false}
                            width="200px"
                            getValue={(value) => handleFinalCard(value)}
                            inputValue={finalCard}
                            maskNumeric={true}
                            numericLimit={4}
                        />

                        <DropdownSingleSelect
                            label={Messages.titles.accountBank}
                            data={formStore.formList.accounts}
                            disabled={false}
                            width={"200px"}
                            idProperty={"index"}
                            descriptionProperty={"accountNumber"}
                            getValue={(value) => handleAccount(value)}
                            value={account}
                        />

                    </div>

                    <div className="register-bank">

                        <DropdownSingleSelect
                            label={Messages.titles.modality}
                            data={globalStore.modality}
                            disabled={false}
                            width={"200px"}
                            idProperty={"id"}
                            descriptionProperty={"name"}
                            getValue={(value) => handleCardModality(value)}
                            value={cardModality}
                        />
                        {(cardModality === 1 || cardModality === 3) && (
                            <DropdownSingleSelect
                                label={Messages.titles.dueDate}
                                data={days}
                                disabled={false}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"name"}
                                getValue={(value) => handleDueDate(value)}
                                value={dueDate}
                            />
                        )}
                        {(cardModality === 1 || cardModality === 3) && (
                            <DropdownSingleSelect
                                label={Messages.titles.closingDate}
                                data={days}
                                disabled={false}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"name"}
                                getValue={(value) => handleClosingDate(value)}
                                value={closingDate}
                            />
                        )}
                        {(cardModality === 1 || cardModality === 3) && (
                            <FormControlLabel style={{marginLeft: "12px"}}
                                              control={
                                                  <Switch checked={hasScore} onChange={handleChangeScore} name="gilad"/>
                                              }
                                              label={Messages.titles.score}
                            />
                        )}
                    </div>

                    {hasScore &&
                        <div className="register-bank">
                            <DropdownSingleSelect
                                label={Messages.titles.program}
                                data={globalStore.program}
                                disabled={false}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"description"}
                                getValue={(value) => handleClosingDate(value)}
                                value={closingDate}
                            />
                            <Input
                                label={Messages.titles.points}
                                disabled={false}
                                width="200px"
                                getValue={(value) => handleFinalCard(value)}
                                inputValue={finalCard}
                                maskNumeric={true}
                            />

                            <DropdownSingleSelect
                                label={Messages.titles.currency}
                                data={globalStore.currency}
                                disabled={false}
                                width={"200px"}
                                idProperty={"id"}
                                descriptionProperty={"description"}
                                getValue={(value) => handleClosingDate(value)}
                                value={closingDate}
                            />
                        </div>
                    }


                    <div className="register-bank">
                        <div className="register-bank-add-button">
                            <ButtonComponent
                                label={Messages.titles.addCard}
                                disabled={ValidateCard({
                                    name: cardName,
                                    owner: cardOwner,
                                    finalNumber: finalCard,
                                    modality: cardModality,
                                    closingDate: closingDate,
                                    dueDate: dueDate,
                                    index: null
                                })}
                                width="140px"
                                height="30px"
                                cursor="pointer"
                                borderRadius="4px"
                                color="white"
                                background="#46ba52"
                                border="none"
                                padding="2px"
                                marginBottom="20px"
                                fontWeight="400"
                                action={addCard}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}