import {CSSProperties, FunctionComponent} from "react";

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
    action: (value: boolean) => void;

}

export const ButtonComponent: FunctionComponent = ({
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
                                                       border
                                                   }: ILoginButton) => {

    const buttonStyle: CSSProperties = {
        width: width,
        height: height,
        cursor: cursor,
        borderRadius: borderRadius,
        color: color,
        background: background,
        padding: padding,
        marginBottom: marginBottom,
        border: border,
        fontWeight: fontWeight,
        backgroundImage: backgroundImage
    };

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

    function handleAction() {
        if (!disabled)
            action(true);
    }

    return (
        <button
            disabled={disabled}
            style={disabled ? disabledStyle : buttonStyle}
            onClick={() => handleAction()}
        >
            {icon ? icon : label}
        </button>

    );
}