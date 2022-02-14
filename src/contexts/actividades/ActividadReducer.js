import { ACTIVIDAD_ACTUAL, ACTIVIDADES_TAREA, AGREGAR_ACTIVIDAD, EDITAR_ACTIVIDAD, ELIMINAR_ACTIVIDAD, PASAR_VALIDACION_ACTIVIDAD, VALIDAR_ACTIVIDAD } from "../../types";

export default (state, action) => {

    switch (action.type) {

        case ACTIVIDADES_TAREA:
            return { ...state, actividadesTarea: action.payload }
        case AGREGAR_ACTIVIDAD:
            return { ...state, actividadesTarea: [ ...state.actividadesTarea, action.payload ], errorActividad: false }
        case VALIDAR_ACTIVIDAD:
            return { ...state, errorActividad: true }
        case PASAR_VALIDACION_ACTIVIDAD:
            return { ...state, errorActividad: false }
        case ELIMINAR_ACTIVIDAD:
            return { ...state, actividadesTarea: state.actividadesTarea.filter( actividad => actividad._id !== action.payload ) }
        case ACTIVIDAD_ACTUAL:
            return { ...state, actividadActual: action.payload }
        case EDITAR_ACTIVIDAD:
            return { ...state, actividadesTarea: state.actividadesTarea.map( actividad => actividad._id === action.payload._id ? action.payload: actividad ), actividadActual: null }
        default:
            return state;

    }
    
}