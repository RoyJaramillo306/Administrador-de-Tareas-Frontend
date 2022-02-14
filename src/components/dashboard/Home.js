import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth/authContext";
import { useNavigate } from "react-router-dom";
import Barra from "../layouts/Barra";
import Sidebar from "../layouts/Sidebar";
import FormTarea from "../pages/FormTarea";
import ListadoTarea from "../pages/ListadoTarea";

const Home = () => {

    let navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado } = authContext;

    useEffect( () => {
        usuarioAutenticado();
        if(!autenticado){
            navigate('/', { replace: true });
        }
    }, []);

    return(
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTarea />
                    </div>
                </main>
            </div>
        </div>
    )

}

export default Home;