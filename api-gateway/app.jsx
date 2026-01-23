
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../src/common/nav-bar";
import LandingPage from "./landing-page";
import Login from "../src/common/login";
import SignIn from "../src/common/sign-in";
import NoLoginCatalog from "../src/catalog/no-login-catalog";
import Home from "../src/home/home"
import { auth } from "../src/firebase";

function App() {

    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = auth.currentUser; 
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(false);
        setShowLogin(false);
    };

    return (
        <div className="app-container">
            <NavBar 
                handleLoginClick={() => setShowLogin(true)}
                handleLogoutClick={() => setIsLoggedIn(true)}
                isLoggedIn={isLoggedIn}
                
            />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<NoLoginCatalog />} />
                <Route path="/home" element={<Home />} />
            </Routes>
            
            {showLogin && (
                <Login 
                    onClose={() => setShowLogin(false)}
                    onLoginSuccess={handleLoginSuccess} 
                />
            )}

        </div>
    )
}

export default App;