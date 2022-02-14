import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "../contexts/auth/authContext";

const PrivateRouter = ({ element: ReactElement, ...props}) => {

    const { autenticado } = useContext(AuthContext);

    return(
        <Route {...props} render={ props => <ReactElement {...props} /> } />
    )

}

export default PrivateRouter;