import {FunctionComponent} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {ButtonComponent} from "../button/index.tsx";
import './footerRegister.css';

interface IFooterRegister {
    path?: string;
    disabled: boolean;
    widthButton: string;
    getValue: (value: boolean) => void;
    iconBack?: React.ReactNode;
    iconCheck?: React.ReactNode;
    showBackButton?: boolean;
    showSaveButton?: boolean;
}

export const FooterRegister: FunctionComponent<IFooterRegister> = ({
                                                                       path,
                                                                       disabled,
                                                                       widthButton,
                                                                       getValue,
                                                                       iconBack,
                                                                       iconCheck,
                                                                       showBackButton = true,
                                                                       showSaveButton = true
                                                                   }: IFooterRegister) => {

    const handleChange = () => {
        getValue(true)
    };

    return (
        <div className={`footer ${showBackButton && showSaveButton ? 'footer' : showBackButton ? 'footer-without-save' : 'footer-without-back'}`}>
            {showBackButton &&
                <Link className="footer-link" to={path}>
                    <span>{iconBack}</span>
                </Link>
            }


            {showSaveButton &&
                <div className="footer-button">
                    <ButtonComponent
                        disabled={disabled}
                        width={widthButton}
                        height="40px"
                        cursor="pointer"
                        borderRadius="6px"
                        color="white"
                        border="none"
                        background="#05465f"
                        padding="2px"
                        marginBottom="20px"
                        fontWeight="600"
                        icon={iconCheck}
                        action={handleChange}
                    />
                </div>
            }
        </div>
    );
}