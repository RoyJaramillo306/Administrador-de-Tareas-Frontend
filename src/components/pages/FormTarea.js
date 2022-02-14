import React, { useContext, useEffect, useState } from "react";
import ActividadContext from "../../contexts/actividades/ActividadContext";
import HomeContext from "../../contexts/dashboard/homeContext";
import Error from "../dashboard/Error";

const FormTarea = () => {

    const tareasContext = useContext(HomeContext);
    const { tarea } = tareasContext;

    const actividadContext = useContext(ActividadContext);
    const { errorActividad, actividadActual, agregarActividad, validarActividad, pasarValidacion, obtenerActividades, editarActividad } = actividadContext;

    const [actividad, setActividad] = useState({ nombre: '' });

    const { nombre } = actividad;

    useEffect( () => {

        if (actividadActual){
            setActividad(actividadActual);
            pasarValidacion();
        } else{
            setActividad({
                nombre: ''
            })
        }

    }, [actividadActual]);

    if(!tarea) return null;

    const [tareaActual] = tarea;

    const cambiar = ({target}) => {
        pasarValidacion();
        setActividad( {...actividad, [target.name]: target.value } );      
    }

    const addActividad = e => {
        e.preventDefault();

        if (nombre.trim()===''){
            validarActividad();
            return;
        }

        if (actividadActual === null) {
            actividad.tareaID = tareaActual._id;
            agregarActividad(actividad);
        } else {
            editarActividad(actividad);
        }

        obtenerActividades(tareaActual._id);

        setActividad({ nombre: '' })

    }

    return(
        <>
            { tarea && (
                <form className="formulario" autoComplete="off" onSubmit={addActividad}>
                <div className="contenedor-input">
                    <input type="text" className="input-text" placeholder="Nombre de la actividad.." name="nombre" onChange={cambiar} value={nombre}/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" className="btn btn-primario btn-submit btn-block" value={actividadActual ? 'Editar Actividad' : 'Agregar Actividad'} />
                </div>
            </form>
            ) }
            { errorActividad && <Error mensaje="El nombre de la actividad es obligatorio." /> }
        </>
    )

}

export default FormTarea;