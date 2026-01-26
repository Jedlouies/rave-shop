
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
            setLoading(false);
        });
       return () => unsubscribe();
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(false);
        setShowLogin(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-container">
            <NavBar 
                handleLoginClick={() => setShowLogin(true)}
                handleLogoutClick={() => setIsLoggedIn(true)}
                isLoggedIn={isLoggedIn}
                
            />
            <Routes>
                <Route path="/" element={!isLoggedIn ? <Navigate to="/home" /> : <LandingPage handleBuyNow={() => setShowLogin(true)} />} />
                <Route path="/products" element={<NoLoginCatalog />} />
                <Route path="/home" element={!isLoggedIn ? <Home /> : <Navigate to="/" />} />
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