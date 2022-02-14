import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth/authContext";
import HomeContext from "../../contexts/dashboard/homeContext";
import Tarea from "./Tarea";

const Listado = () => {

    const { tareas, obtenerTareas } = useContext(HomeContext);

    const { usuarioAutenticado } = useContext(AuthContext);

    useEffect( () => {
        usuarioAutenticado();
        obtenerTareas();
    }, []);

   if(tareas.length === 0) return <p>No hay tareas, comienza creando uno</p>

    return(
        <>
            <ul className="list-group listado-proyectos">
            { tareas.map( tarea => <Tarea key={tarea._id} tarea={tarea} /> ) }
            </ul>
        </>
    )

}

export default Listado;