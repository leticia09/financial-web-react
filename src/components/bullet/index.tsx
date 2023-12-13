import "./bullet.css"
import {FunctionComponent} from "react";

interface IBullet {
    color: string;
    label?: string;
    showLabel?: boolean;
    tooltip?: string;
    showTooltip?: boolean;

}


export const BulletComponent: FunctionComponent<IBullet> = ({
                                                                color,
                                                                label,
                                                                showLabel,
                                                                tooltip,
                                                                showTooltip
                                                            }: IBullet) => {
    const bulletStyle = {
        backgroundColor: color,
        width: '20px',
        height: '20px',
        borderRadius: '20px',
    };
    return (
        <div>
            {showLabel && label &&
                <div className={label === "Inativo" ? "bullet-content-inactive" : "bullet-content"}>
                    <div style={bulletStyle}></div>
                    <span>{label}</span>
                </div>
            }
            { !showLabel && !label &&
                <div className="bullet-content-not-label">
                    <div style={bulletStyle}></div>
                </div>
            }
        </div>
    );
}