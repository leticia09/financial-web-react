import {CSSProperties, FunctionComponent, useEffect, useRef, useState} from "react";
import "./button.css";

interface ILoginButton {
    label?: string;
    disabled: boolean;
    width: string;
    height: string;
    cursor: string;
    borderRadius: string;
    color: string;
    background?: string;
    padding?: string;
    marginBottom?: string;
    fontWeight: string;
    backgroundImage?: string;
    border?: string;
    icon?: React.ReactNode;
    action: (value: boolean, path?:any) => void;
    haveMenu?: boolean;
    menuOptions?: any[];

}

export const ButtonComponent: FunctionComponent <ILoginButton> = ({
                                                       label,
                                                       disabled,
                                                       action,
                                                       width,
                                                       height,
                                                       cursor,
                                                       borderRadius,
                                                       color,
                                                       background,
                                                       padding,
                                                       marginBottom,
                                                       fontWeight,
                                                       backgroundImage,
                                                       icon,
                                                       border,
                                                       haveMenu,
                                                       menuOptions
                                                   }: ILoginButton) => {

    const [openMenu, setOpenMenu] = useState(false);

    const buttonStyle: CSSProperties = {
        width: width,
        height: height,
        cursor: cursor,
        borderRadius: borderRadius,
        color: color,
        padding: padding,
        marginBottom: marginBottom,
        border: border,
        fontWeight: fontWeight,
        backgroundImage: backgroundImage
    };

    if (background) {
        buttonStyle.background = background;
    }

    const disabledStyle: CSSProperties = {
        width: width,
        height: height,
        borderRadius: borderRadius,
        color: color,
        background: "rgba(5, 70, 95, 0.7)",
        padding: padding,
        marginBottom: marginBottom,
        border: border,
        fontWeight: fontWeight
    };

    const menuStyle: CSSProperties = {
        width: width,
        background: "white",
        marginTop:"-16px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        position: "absolute",
        zIndex: "999"

    };
    const checkAndCloseMenu = () => {
        if (openMenu) {
            setOpenMenu(false);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(checkAndCloseMenu, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [openMenu]);

    function handleAction(havePath?: string) {
        if (!disabled) {
            if(!haveMenu) {
                action(true);
            } else if(havePath) {
                action(true, havePath);
            } else {
                setOpenMenu(!openMenu);
            }
        }
    }

    return (
        <>
            <button
                disabled={disabled}
                style={disabled ? disabledStyle : buttonStyle}
                onClick={() => handleAction()}
            >
                {icon ? icon : label}
            </button>
            {haveMenu && openMenu &&
            <div style={menuStyle}>
                {menuOptions && menuOptions.map((option) => (
                    <div className="itemMenuStyle">
                        <div onClick={() => handleAction(option.path)}>{option.label}</div>
                    </div>
                ))}
            </div>
            }


        </>

    );
}