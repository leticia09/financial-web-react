import "./bullet.css"
import {FunctionComponent} from "react";

interface IBullet {
    color: string;
    label?: string;
    showLabel?: boolean;
    tooltip?: string;
    showTooltip?: boolean;

}


export const BulletComponent: FunctionComponent <IBullet> = ({
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
    return <div className="bullet-content">
        <div style={bulletStyle}></div>

        {showLabel && label &&  <span>{label}</span>}
    </div>;
}