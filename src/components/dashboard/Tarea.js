import React, { useContext } from "react";
import styled from '@emotion/styled'
import HomeContext from "../../contexts/dashboard/homeContext";
import ActividadContext from "../../contexts/actividades/ActividadContext";

const Li = styled.li`
    cursor: pointer;
`;

const Tarea = ({tarea}) => {

    const { tareaActual } = useContext(HomeContext);

    const { obtenerActividades } = useContext(ActividadContext);

    const ir = () => {
        tareaActual(tarea._id);
        obtenerActividades(tarea._id);
    }

    return(
        <Li className="aver list-group-item list-group-item-dark list-group-item-action">
            <button type="button" className="btn btn-blank" onClick={ir}><i className="bi bi-pencil"></i> {tarea.nombre} </button>
        </Li>
    )

}

export default Tarea;