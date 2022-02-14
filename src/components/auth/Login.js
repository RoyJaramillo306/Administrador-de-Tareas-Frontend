import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaContext from "../../contexts/alertas/alertaContext";
import AuthContext from "../../contexts/auth/authContext";

const Login = () => {

    let navigate = useNavigate();

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    useEffect( () => {
    
        if(autenticado){
            navigate('/dashboard', { replace: true });
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado]);

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const cambio = ({target}) => {
        setUsuario( { ...usuario, [target.name]: target.value } );
    }

    const login = (e) => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Los campos son obligatorios', 'alert-danger');
        } else {
            iniciarSesion({ email, password });
        }

    }

    return(
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                { alerta && <div className={`alert ${alerta.categoria} mb-5`}>{alerta.msg}</div> }
                <h1>Iniciar Sesión</h1>
                <form autoComplete="off" onSubmit={login}>
                    <div className="campo-form">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" placeholder="Ingrese su email" value={email} onChange={cambio}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" value={password} onChange={cambio}/>
                    </div>
                    <div className="campo-form">
                        <button type="submit" className="btn btn-primario btn-block">Entrar</button>
                    </div>
                </form>
                <Link to={'/registro'} className="enlace-cuenta"> Registrarme. </Link>
            </div>
        </div>
    )

}

export default Login;