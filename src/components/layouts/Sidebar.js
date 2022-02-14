import React from "react";
import Listado from "../dashboard/Listado";
import Nuevo from "../dashboard/Nuevo";

const Sidebar = () => {

    return(
        <aside>
            <h1>Administrador de tareas</h1>
            <Nuevo />
            <div className="proyectos">
                <h2>TAREAS</h2>
                <Listado />
            </div>
        </aside>
    )

}

export default Sidebar;