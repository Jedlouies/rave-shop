import { Routes, Route } from "react-router-dom";

import NavBar from "../src/common/nav-bar";

import LandingPage from "./landing-page";

function App() {
    return (
        <div className="app-container">
            <NavBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />

                
            </Routes>

        </div>
    )
}

export default App;