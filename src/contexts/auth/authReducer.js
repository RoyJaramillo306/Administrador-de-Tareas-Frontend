import { CERRAR_SESION, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO, SESION_ERROR, SESION_EXITOSA } from "../../types";

export default (state, action) => {

    switch (action.type) {

        case REGISTRO_EXITOSO:
        case SESION_EXITOSA:
            localStorage.setItem('token', action.payload.token);
            return{ ...state, autenticado: true, mensaje: null }

        case OBTENER_USUARIO:
            return { ...state, autenticado: true, usuario: action.payload }

        case SESION_ERROR:
        case CERRAR_SESION:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return { ...state, token: null, usuario: null, autenticado: null, mensaje: action.payload }

        default:
            return state
    }

}