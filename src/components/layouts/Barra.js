import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth/authContext";
import { useNavigate } from "react-router-dom";

const Barra = () => {

    let navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const { usuario, autenticado, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    if(!autenticado){
        navigate('/', { replace: true });
    }

    return(
        <header className="app-header">
            { usuario && <p className="nombre-usuario"><i className="bi bi-person-circle"></i> <span> {usuario.nombre} </span></p> }
            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion" onClick={cerrarSesion}><i className="bi bi-box-arrow-left"></i> Cerrar sesión</button>
            </nav> 
        </header>
    );

}

export default Barra;