import { AGREGAR_TAREA, ELIMINAR_TAREA, FORMULARIO_TAREA, OBTENER_TAREAS, PASAR_VALIDACION_TAREA, TAREA_ACTUAL, TAREA_ERROR, VALIDAR_FORMULARIO } from "../../types";

export default (state,action) => {
    switch (action.type){
        case FORMULARIO_TAREA:
            return { ...state, formulario: true }
        case OBTENER_TAREAS:
            return{ ...state, tareas: action.payload }
        case AGREGAR_TAREA:
            return { ...state, tareas: [...state.tareas, action.payload], formulario: false, error: false }
        case VALIDAR_FORMULARIO:
            return { ...state, error: true }
        case PASAR_VALIDACION_TAREA:
            return { ...state, error: false }
        case TAREA_ACTUAL:
            return { ...state, tarea: state.tareas.filter( tarea => tarea._id === action.payload ) }
        case ELIMINAR_TAREA:
            return { ...state, tareas: state.tareas.filter( tarea => tarea._id !== action.payload ), tarea: null }
        case TAREA_ERROR:
            return { ...state, mensaje: action.payload }
        default:
            return state;
    }
}