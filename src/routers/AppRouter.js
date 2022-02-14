import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Registro from "../components/auth/Registro";
import Home from "../components/dashboard/Home";

const AppRouter = () => {

    return(

        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/registro" element={<Registro />} />
                <Route exact path="/dashboard" element={<Home />} />
            </Routes>
        </Router>

    )

}

export default AppRouter;