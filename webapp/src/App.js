import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home.js"
import Register from "./Register.js"

import "./App.css"

function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={ <Home/> }
                    />
                    <Route
                        path="/register"
                        element={ <Register/> }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
