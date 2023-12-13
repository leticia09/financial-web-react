import './splashScreen.css'
import {useEffect} from "react";
import {preLoaderAnim} from "./animations";
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import {Messages} from "../../internationalization/message/index.ts";


const SplashScreen: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        preLoaderAnim();

        const redirectTimeout = setTimeout(() => {
            navigate('/dashboard');
        }, 5000);
        return () => clearTimeout(redirectTimeout);
    }, [navigate]);


    return (
        <div className="proloader">
            <div className="text">
                <div className="texts-container">
                    <span className="grap-small"></span>
                    <span className="grap-medium"></span>
                    <span className="grap-large"></span>
                </div>

                <span className="title-financial">{Messages.titles.financial}</span>
                <span className="subtitle">{Messages.titles.family}</span>
            </div>
        </div>
    );
};

export default SplashScreen;