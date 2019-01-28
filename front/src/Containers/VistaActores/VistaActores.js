import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.css';
//Actions
import { cargarActores } from '../../Redux/Actions/actoresAccion';
//Servicios
import ServicioActores from '../../Servicios/ServicioActores/ServicioActores';
//Componentes
import Actor from './ComponenteActor/Actor';

class VistaActores extends Component {
    constructor(props) {
        super(props);
        this.cargarActores();
    }
    componentWillMount() {
        if (this.props.usuario.length == 0) {
            this.props.history.push('/');
        }
    }
    async cargarActores() {
        let service = new ServicioActores();
        let actores = await service.cargarActores();
        //Cargar actores al store.
        this.guardarActoresStore(actores);
    }

    guardarActoresStore(actores) {
        this.props.dispatch(cargarActores(actores));
    }

    render() {
        return (
            <div className="ContainerVistaActores">
                <div className="conteinerActores">
                    {
                        this.props.actores.map((actor) =>
                            <div className="ContenedorActor">
                                <Actor key={actor.id} actor={actor} />
                            </div>
                        )
                    }  
                </div>             
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        actores: state.actores,
        usuario: state.usuario
    }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaActores);