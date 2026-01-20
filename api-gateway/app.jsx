
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../src/common/nav-bar";
import LandingPage from "./landing-page";
import Login from "../src/common/login";
import NoLoginCatalog from "../src/catalog/no-login-catalog";
import Home from "../src/home/home"

function App() {

    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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