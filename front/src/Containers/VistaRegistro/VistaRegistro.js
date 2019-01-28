import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
//Servicios.
import ServicioUsuario from '../../Servicios/ServicioUsuario/ServicioUsuario';
//Actions
import { loginUsuario } from '../../Redux/Actions/usuarioAccion';

class VistaRegistro extends Component {
    constructor() {
        super();
        this.state = { name: '', email: '', password: '',error:'' };
        this.manejoNombre = this.manejoNombre.bind(this);
        this.manejoEmail = this.manejoEmail.bind(this);
        this.manejoPassword = this.manejoPassword.bind(this);
        this.registrar = this.registrar.bind(this);
    }
    //Envio de datos.
    async registrar(event) {
        event.preventDefault();
        let servicio = new ServicioUsuario(); 
        let nuevoUsuario = {
            "name": this.state.name,
            "email": this.state.email,
            "password":this.state.password
        }
        let resultado = await servicio.registrarUsuario(nuevoUsuario);
        if (resultado != null) {
            localStorage.setItem('sesion', JSON.stringify(resultado.data));
            localStorage.setItem('estado', 'true');
            this.props.dispatch(loginUsuario(resultado.data));
            this.props.history.push("/peliculas");
        } else {
            this.setState({ 'error': '*El usuario ya existe' });
        }
        
    }
    //Manejo del formulario.
    manejoNombre(event) { this.setState({name:event.target.value}) }
    manejoEmail(event) { this.setState({email:event.target.value})}
    manejoPassword(event) { this.setState({password:event.target.value})}
    //Renderizacion del container.

    render() {
        return (
            <div className="ContainerVistaRegistro">
                <div className="ContainerFormularioRegistro">
                    <form className="FormularioRegistro" onSubmit={this.registrar}>
                        <h2>Formulario registro</h2>
                        <label>
                            Nombre:
                            <input className="input" value={this.state.name} onChange={this.manejoNombre} type="text" placeholder="Introduce tu nombre" required />
                        </label>
                        <label>
                            Email:
                            <input className="input" value={this.state.email} onChange={this.manejoEmail} type="email" placeholder="Introduce tu email" required />    
                        </label>
                        <label>
                            Contrasena:
                            <input className="input" value={this.state.password} onChange={this.manejoPassword} type="password" placeholder="Introduce tu contrasena" required />
                        </label>
                        <input className="boton" type="submit" value="Registrar" />
                        <span>{this.state.error}</span>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(VistaRegistro);