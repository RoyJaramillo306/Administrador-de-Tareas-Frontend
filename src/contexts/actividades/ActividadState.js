import React, { useReducer } from "react";
import ActividadReducer from "./ActividadReducer";
import ActividadContext from "./ActividadContext";
import { ACTIVIDAD_ACTUAL, ACTIVIDADES_TAREA, AGREGAR_ACTIVIDAD, EDITAR_ACTIVIDAD, ELIMINAR_ACTIVIDAD, PASAR_VALIDACION_ACTIVIDAD, VALIDAR_ACTIVIDAD } from "../../types";
import clienteAxios from "../../config/axios";

const ActividadState = props => {

    const initialState = {
        actividadesTarea: [],
        actividadActual: null,
        errorActividad: false
    }

    const [state, dispatch] = useReducer(ActividadReducer, initialState);

    const obtenerActividades = async id => {
        
        try {

            if(id === null){
                
                dispatch({
                    type: ACTIVIDADES_TAREA,
                    payload: []
                })

            } else {

                const {data} = await clienteAxios.get('/api/actividades', { params: {id} });
            
                dispatch({
                    type: ACTIVIDADES_TAREA,
                    payload: data.actividades
                })

            }

        } catch ({response}){
            console.log(response.data.msg);
        }

    }

    const agregarActividad = async actividad => {
        
        try {

            const {data} = await clienteAxios.post('/api/actividades', actividad);

            dispatch({
                type: AGREGAR_ACTIVIDAD,
                payload: data.actividad
            })

        } catch ({response}) {
            console.log(response.data.errors[0].msg);
        }
    }

    const validarActividad = () => {
        dispatch({
            type: VALIDAR_ACTIVIDAD
        })
    }

    const pasarValidacion = () => {
        dispatch({
            type: PASAR_VALIDACION_ACTIVIDAD
        })
    }

    const eliminarActividad = async (id) => {
        
        try {

            const {data} = await clienteAxios.delete(`/api/actividades/${id}`);
            console.log(data.msg);
            dispatch({
                type: ELIMINAR_ACTIVIDAD,
                payload: id
            })

        } catch (error) {
            console.log(error);
        }

    }

    const obtenerActividadActual = actividad => {
        dispatch({
            type: ACTIVIDAD_ACTUAL,
            payload: actividad
        })
    }

    const editarActividad = async actividad => {
        
        try {

            const {data} = await clienteAxios.put(`/api/actividades/${actividad._id}`, actividad);
            
            dispatch({
                type: EDITAR_ACTIVIDAD,
                payload: data.actividad
            })

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <ActividadContext.Provider value={{ actividadesTarea: state.actividadesTarea, errorActividad: state.errorActividad, actividadActual: state.actividadActual,
                                            obtenerActividades, agregarActividad, validarActividad, pasarValidacion, eliminarActividad, editarActividad, obtenerActividadActual }}>
            { props.children }
        </ActividadContext.Provider>
    )

}

export default ActividadState;