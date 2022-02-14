import styled from "@emotion/styled";
import React, { useContext } from "react";
import ActividadContext from "../../contexts/actividades/ActividadContext";
import HomeContext from "../../contexts/dashboard/homeContext";

const H5 = styled.h5`
    cursor: pointer;
`;

const PrincipalTarea = ({actividad}) => {

    const actividadContext = useContext(ActividadContext);
    const { obtenerActividades, eliminarActividad, obtenerActividadActual, editarActividad } = actividadContext;

    const tareaContext = useContext(HomeContext);
    const { tarea } = tareaContext;

    const [ tareaActual ] = tarea;

    const eliminar = () => {
        eliminarActividad(actividad._id);
        obtenerActividades(tareaActual._id);
    }

    const cambiarEstado = () => {
        if (actividad.estado) {
            actividad.estado = false;
        } else {
            actividad.estado = true;
        }
        editarActividad(actividad);
    }

    const editar = () => {
        obtenerActividadActual(actividad);
    }

    return(
        <li className="tarea sombra">
            <p> {actividad.nombre} </p>
            <div className="estado">
                { actividad.estado ? (<H5 className="completo" onClick={cambiarEstado}>Completo</H5>) : (<H5 className="incompleto" onClick={cambiarEstado}>Incompleto</H5>) }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-dark" onClick={editar}><i className="bi bi-pencil-square"></i> Editar</button>
                <button type="button" className="btn btn-dark" onClick={eliminar}><i className="bi bi-trash"></i> Eliminar</button>
            </div>
        </li>
    )

}

export default PrincipalTarea;