import React, { useContext, useState } from "react";
import styled from '@emotion/styled';
import HomeContext from "../../contexts/dashboard/homeContext";
import Error from "./Error";

const Button = styled.button`
    font-size: 14px;
`;

const Nuevo = () => {

    const nuevoContext = useContext(HomeContext);
    
    const { formulario, error, mostrarFormulario, agregarTarea, mostrarError, pasarValidacion } = nuevoContext;

    const [tarea, setTarea] = useState({ nombre: '' });

    const { nombre } = tarea;

    const cambio = ({target}) => {
        pasarValidacion();
        setTarea({ ...tarea, [target.name]: target.value })
    }

    const irTarea = (e) => {
        e.preventDefault();

        if (nombre.trim() === ''){
            mostrarError();
            return;
        }

        agregarTarea(tarea);

        setTarea({ nombre: '' });

    }

    const mostrar = () => mostrarFormulario();

    return(
        <>
            <Button type="button" className="btn btn-dark btn-block" onClick={mostrar}><i className="bi bi-plus"></i> Nueva Tarea</Button>
            { formulario && (
                <form className="formulario-nuevo-proyecto" autoComplete="off" onSubmit={irTarea}>
                    <input type="text" className="input-text" placeholder="Nombre de la nueva tarea" name="nombre" value={nombre} onChange={cambio}/>
                    <Button type="submit" className="btn btn-dark btn-block">Agregar Tarea</Button>
                </form>
            ) }
            { error && <Error mensaje="El nombre es obligatorio" /> }
        </>
    )

}

export default Nuevo;