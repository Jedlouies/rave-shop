
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase";
import Home from "../src/home/home"
import NavBar from "../src/common/nav-bar";
import LandingPage from "./landing-page";
import Login from "../src/common/login";
import NoLoginCatalog from "../src/catalog/no-login-catalog";
import Catalog from "../src/catalog/catalog";

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
        return <div className="loading-screen" 
        style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        > 
        <img src="/loading.gif" alt="Loading..." width={200} height={200}/>
        </div>;
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

                <Route path="/products/catalog/view" element={<Catalog />} />
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