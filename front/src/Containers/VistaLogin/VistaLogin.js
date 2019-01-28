import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './style.css';
//Servicios
import ServicioUsuario from '../../Servicios/ServicioUsuario/ServicioUsuario';
//Actions
import { loginUsuario } from '../../Redux/Actions/usuarioAccion';
//Navegacion
import { withRouter } from "react-router-dom";


class VistaLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.manejoEmail = this.manejoEmail.bind(this);
        this.manejoPassword = this.manejoPassword.bind(this);
        this.loguear = this.loguear.bind(this);
    }
    componentWillMount() {
        //Mantenemos el estado de la sesion.
        if (localStorage.getItem('estado') == 'true') {
            this.props.dispatch(loginUsuario(JSON.parse(localStorage.getItem('sesion'))));
            this.props.history.push('/peliculas');
        }    
    }
    //Manejo del formulario.
    manejoEmail(event) {
       this.setState({ email: event.target.value });
    }
    manejoPassword(event) {
        this.setState({ password: event.target.value });
    }

    async loguear(event) {
        event.preventDefault();
        let servicio = new ServicioUsuario();
        let usuario = {
            "email": this.state.email,
            "password": this.state.password
        }
        let result = await servicio.loguearUsuario(usuario);
        
        if (result != null) {
            //Guardamos el usuario en el localstorage,ademas del estado de la aplicacion.
            localStorage.setItem('sesion', JSON.stringify(result.data));
            localStorage.setItem('estado', 'true');
            this.props.dispatch(loginUsuario(result.data));
            this.props.history.push("/peliculas");
        } else {
            this.setState({ error: 'Fallo de autenticacion' });
        }
        
    }
    render() {
        return (

            <div className="ContainerVistaLogin">
                <div className="ContainerFormularioLogin">
                    <form onSubmit={this.loguear} className="FormularioLogin">
                        <h2>Formulario Login</h2>
                        <span>Email:</span>
                        <label>
                            <input className="input" value={this.state.email} onChange={this.manejoEmail} type="email" placeholder="Introducir Email" required />
                        </label>
                        <span>Contrasena:</span>
                        <label>
                            <input className="input" value={this.state.password} onChange={this.manejoPassword} type="password" placeholder="Introducir Contrasena" required />
                        </label>
                        <input className="boton" type="submit" value="Iniciar sesion" />
                        <p>{this.state.error}</p>
                        <span>No tienes cuenta? <NavLink to="/registro">Registrate</NavLink></span>
                    </form>
                    
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}

export default connect(mapDispatchToProps)( VistaLogin );