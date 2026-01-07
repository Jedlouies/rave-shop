
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../src/common/nav-bar";
import LandingPage from "./landing-page";
import Login from "../src/common/login";

function App() {

    const [showLogin, setShowLogin] = useState(false);
    
    return (
        <div className="app-container">
            <NavBar handleLoginClick={() => setShowLogin(true)}/>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                
            </Routes>
            
            {showLogin && (
                <Login onClose={() => setShowLogin(false)} />
            )}

        </div>
    )
}

export default App;