import React, { useReducer } from "react";
import { AGREGAR_TAREA, ELIMINAR_TAREA, FORMULARIO_TAREA, OBTENER_TAREAS, PASAR_VALIDACION_TAREA, TAREA_ACTUAL, TAREA_ERROR, VALIDAR_FORMULARIO } from "../../types";
import homeContext from "./homeContext";
import homeReducer from "./homeReducer";
import clienteAxios from "../../config/axios";


const HomeState = (props) => {

    const initialState = {
        tareas: [],
        formulario: false,
        error: false,
        tarea: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(homeReducer, initialState);

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_TAREA
        })
    }

    const obtenerTareas = async () => {
        
        try {
            const {data} = await clienteAxios.get('/api/tareas');
            dispatch({
                type: OBTENER_TAREAS,
                payload: data.tareas
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const agregarTarea = async tarea => {
        try {
            const {data} = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }

    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const pasarValidacion = () => {
        dispatch({
            type: PASAR_VALIDACION_TAREA
        })
    }

    const tareaActual = id => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: id
        })
    }

    const eliminarTarea = async id => {
        
        try {

            const {data} = await clienteAxios.delete(`/api/tareas/${id}`);
            
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

            const alerta = {
                msg: data.msg,
                categoria: 'alert-success'
            }

            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })

        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alert-danger'
            }
            
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }

    }   

    return(
        <homeContext.Provider value={{ tareas: state.tareas, formulario: state.formulario, error: state.error, tarea: state.tarea, mensaje: state.mensaje,
                                       mostrarFormulario, obtenerTareas, agregarTarea, mostrarError, tareaActual, eliminarTarea, pasarValidacion }}>
            {props.children}
        </homeContext.Provider>
    )

}

export default HomeState;