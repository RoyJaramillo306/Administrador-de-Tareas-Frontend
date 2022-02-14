import styled from "@emotion/styled";
import React, { useContext, useEffect } from "react";
import ActividadContext from "../../contexts/actividades/ActividadContext";
import HomeContext from "../../contexts/dashboard/homeContext";
import AlertaContext from "../../contexts/alertas/alertaContext";
import PrincipalTarea from "./PrincipalTarea";

const Button = styled.button`
    font-size: 13px;
`;

const ListadoTarea = () => {

    const { alerta, mostrarAlerta } = useContext(AlertaContext);

    const { tarea, mensaje, eliminarTarea } = useContext(HomeContext);

    const { actividadesTarea, obtenerActividades } = useContext(ActividadContext);

    useEffect(() => {
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
        if(!tarea){
            obtenerActividades(tarea);
        }
    }, [mensaje]);

    if (!tarea) return (
        <>
            <h2>Selecciona una tarea</h2>
            { alerta && <div className={`alert ${alerta.categoria}`}> {alerta.msg} </div> }
        </>
    ) 

    const [tareaActual] = tarea;

    const eliminar = () => {
        eliminarTarea(tareaActual._id);
    }

    return(
        <>
            <h2>Tarea: { tareaActual.nombre } </h2>
            <ul className="listado-tareas"> 
                { actividadesTarea.length===0 ? (<li className="tarea"><p>No hay actividades para esta tarea</p></li>) : actividadesTarea.map( actividad => <PrincipalTarea key={actividad._id} actividad={actividad} /> ) } 
                <Button type="button" className="btn btn-outline-dark" onClick={eliminar}>Eliminar tarea <i className="bi bi-x-circle"></i></Button>
            </ul><br/>
            <hr/>
        </> 
    )

}

export default ListadoTarea;