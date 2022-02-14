import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaContext from "../../contexts/alertas/alertaContext";
import AuthContext from "../../contexts/auth/authContext";

const Registro = () => {

    let navigate = useNavigate();

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    useEffect( () => {
    
        if(autenticado){
            navigate('/dashboard', { replace: true });
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado]);

    const [login, setLogin] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = login;

    const cambio = ({target}) => {
        setLogin( { ...login, [target.name]: target.value } );
    }

    const logear = (e) => {
        e.preventDefault();

        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ) { mostrarAlerta('Los campos son obligatorios', 'alert-danger'); return} 

        if(password.length < 6) { mostrarAlerta('El password debe tener un mínimo de 6 caracteres', 'alert-danger'); return}

        if(password !== confirmar) { mostrarAlerta('Los passwords deben ser iguales', 'alert-danger'); return}

        registrarUsuario({ nombre, email, password });

    }

    return(
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                { alerta && <div className={`alert ${alerta.categoria} mb-5`}>{alerta.msg}</div> }
                <h1>Crear una cuenta</h1>
                <form autoComplete="off" onSubmit={logear}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre de usuario: </label>
                        <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" value={nombre} onChange={cambio}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" placeholder="Ingrese su email" value={email} onChange={cambio}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" value={password} onChange={cambio}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password: </label>
                        <input type="password" id="confirmar" name="confirmar" placeholder="Ingrese de nuevo su contraseña" value={confirmar} onChange={cambio}/>
                    </div>
                    <div className="campo-form">
                        <button type="submit" className="btn btn-primario btn-block">Registrar</button>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar sesión.
                </Link>
            </div>
        </div>
    )

}

export default Registro;