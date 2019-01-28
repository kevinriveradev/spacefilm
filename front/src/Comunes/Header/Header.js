import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { cerrarSesion } from '../../Redux/Actions/usuarioAccion';
import './style.css';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'usuario': this.props.usuario,
            'hayUsuario': false,
            'menu': <nav>
                        <NavLink className="link" to="/"><span>Iniciar sesion</span></NavLink>
                        <NavLink className="link" to="/registro"><span>Registrar</span></NavLink>
                    </nav>,
            'cerrarSesion': '',
            'nombreUsuario':''
        }
        this.LogOut = this.LogOut.bind(this);
        
    }
    componentWillMount() {
        //Mantenemos el estado de la sesion.
        if (localStorage.getItem('estado') == 'true') {
            this.setState({ 'hayUsuario': true });
            let nombre = JSON.parse(localStorage.getItem('sesion'));
            this.setState({ 'nombreUsuario': 'Hola, ' + nombre.usuario.name });
        }
        
    }
    LogOut() {
        this.props.dispatch(cerrarSesion([]));
        localStorage.removeItem('sesion');
        localStorage.removeItem('estado');
        window.location.replace('/');
    }

   
    componentWillReceiveProps() {
        if (localStorage.getItem('estado') == 'true') {
            this.setState({
                'menu': <nav>
                    <NavLink className="link" to="/peliculas"><span>Peliculas</span></NavLink>
                    <NavLink className="link" to="/actores"><span>Actores</span></NavLink>
                </nav>
            });
            this.setState({
                'cerrarSesion': <img className="cerrarSesion" src="/exit-2.png" onClick={this.LogOut} />
            });
            this.setState({ 'usuario': JSON.parse(localStorage.getItem('sesion')) })
        } 
    }
    
    render() {
        
        return (
            <div>
                <header>
                    <div className="logo">
                        <NavLink to="/peliculas"><h3>Spacefilm</h3></NavLink>
                    </div>
                    <div className="navegacion">
                        {this.state.menu}
                    </div>
                    <div className="usuario">
                        <span className="nombreUsuario">{this.state.nombreUsuario}</span>
                        <nav>
                            {this.state.cerrarSesion}
                        </nav>
                    </div>
                </header>
            </div>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}

const mapStateToProps = (state) => {
    return {
        usuario: state.usuario
    }
}

export default connect(mapStateToProps)(Header);