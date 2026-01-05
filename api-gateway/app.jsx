import { Routes, Route } from "react-router-dom";

import LandingPage from "./landing-page";

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<LandingPage />} />

                
            </Routes>

        </div>
    )
}

export default App;