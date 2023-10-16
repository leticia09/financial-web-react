import './App.css';
import SplashScreen from "./pages/splash-screen/splashScreen.tsx";
import { Login } from "./pages/login/login.tsx";
import { BrowserRouter as Router, Route, Routes , Navigate} from "react-router-dom";
import {RegisterAccount} from "./pages/register-account/index.tsx";
import useLoginStore from "./pages/login/store/useLoginStore.ts";
import {Layout} from "./layout/index.tsx";

const Private = ({ loginInformation }) => {
    if(loginInformation.auth == true){
        return <Layout loginInformation = {loginInformation}/>;
    } else {
        return <Navigate to="/login" />;
    }
}
function App() {
    const loginStore = useLoginStore();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<Login />} />
                <Route exact path="/register-account" element={<RegisterAccount />} />
                <Route path="/*" element={<Private loginInformation={loginStore} />} />
            </Routes>
        </Router>
    );
}
export default App;