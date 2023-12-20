import './App.css';
import SplashScreen from "./pages/splash-screen/splashScreen.tsx";
import {Login} from "./pages/login/login.tsx";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {RegisterAccount} from "./pages/register-account";
import useLoginStore from "./pages/login/store/useLoginStore.ts";
import {Layout} from "./layout";
import {ToastProvider} from "./components/toast/ToastContext";

const Private = ({loginInformation}) => {
    if (loginInformation.auth === true) {
        return <Layout loginInformation={loginInformation}/>;
    } else {
        return <Navigate to="/login"/>;
    }
}

function App() {
    const loginStore = useLoginStore();

    return (
        <ToastProvider>
            <Router>
                <Routes>
                    <Route path="/splash" element={<SplashScreen/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route exact path="/register-account" element={<RegisterAccount/>}/>
                    <Route path="/*" element={<Private loginInformation={loginStore}/>}/>
                </Routes>
            </Router>
        </ToastProvider>
    );
}

export default App;