import React, { useReducer } from "react";
import { CERRAR_SESION, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO, SESION_ERROR, SESION_EXITOSA } from "../../types";
import authReducer from "./authReducer";
import authContext from "./authContext";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {

        try {

            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch ({response}) {

            const alerta = {
                msg: response.data.msg,
                categoria: 'alert-danger'
            }

            dispatch({
                type: REGISTRO_ERROR, 
                payload: alerta
            })

        }

    }

    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token');

        if (token) tokenAuth(token);

        try {
            
            const { data } = await clienteAxios.get('/api/auth');
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: data.usuario
            });

        } catch ({response}) {
            dispatch({
                type: SESION_ERROR,
                payload: response.data.msg
            })
        }

    }

    const iniciarSesion = async datos => {

        try {

            const { data } = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: SESION_EXITOSA,
                payload: data
            })

            usuarioAutenticado();
            
        } catch ({response}) {
            
            const alerta = {
                msg: response.data.msg,
                categoria: 'alert-danger'
            }

            dispatch({
                type: SESION_ERROR, 
                payload: alerta
            })

        }

    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <authContext.Provider value={{ token: state.token, autenticado: state.autenticado, usuario: state.usuario, mensaje: state.mensaje, registrarUsuario, iniciarSesion, usuarioAutenticado, cerrarSesion }}>
            { props.children }
        </authContext.Provider>
    )

}

export default AuthState;
