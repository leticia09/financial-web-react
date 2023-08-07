import {FunctionComponent} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {ButtonComponent} from "../button/index.tsx";
import './footerRegister.css';

interface IFooterRegister {
    path: string;
    disabled: boolean;
    widthButton: string;
    getValue: (value: boolean) => void;
    iconBack: React.ReactNode;
    iconCheck: React.ReactNode;
}

export const FooterRegister: FunctionComponent = ({
                                                      path,
                                                      disabled,
                                                      widthButton,
                                                      getValue,
                                                      iconBack,
                                                      iconCheck
                                                  }: IFooterRegister) => {

    const handleChange = () => {
        getValue(true)
    };

    return (
        <div className="footer">
            <Link className="footer-link" to={path}>
                <span>{iconBack}</span>
            </Link>

            <div className="footer-button">
                <ButtonComponent
                    disabled={disabled}
                    width="100px"
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
        </div>
    );
}