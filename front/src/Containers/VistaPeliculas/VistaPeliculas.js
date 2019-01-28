import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import { withRouter } from 'react-router-dom';
//Actions.
import { cargarPeliculas } from '../../Redux/Actions/peliculasAccion';
//Servicios
import ServicioPeliculas from '../../Servicios/ServicioPeliculas/ServicioPeliculas';
import ServicioPeliculasUsuario from '../../Servicios/ServicioPeliculasUsuario/ServicioPeliculasUsuario';
//Componentes
import Pelicula from './ComponentePelicula/Pelicula';
import Filtrador from './Filtrador/Filtrador';
import Favoritos from './Favoritos/Favoritos';


class VistaPeliculas extends Component {
    constructor(props) {
        super(props);
        this.cargarPeliculas();
    }
    componentWillMount() {
        if (this.props.usuario.length == 0) {
            this.props.history.push('/');
        }
    }
    async cargarPeliculas() {
        let servicio = new ServicioPeliculas();
        let resultado = await servicio.cargarPeliculas();
        this.saveStore(resultado);
    }

    saveStore(peliculas) {
        this.props.dispatch(cargarPeliculas(peliculas));
    }

    render() {
       
        return (
            <div className="ContainerVistaPeliculas">
                
                <div className="ContainerFiltro">
                    <Filtrador />
                    <br />
                    <Favoritos />
                </div>
                
                <div className="ContainerListaPeliculas">
                    {
                        this.props.peliculas.map((pelicula) =>
                            <Pelicula key={pelicula.id} id={pelicula.id} pelicula={pelicula} />
                        )
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        peliculas: state.peliculas,
        usuario:state.usuario
    }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}




export default connect(mapStateToProps, mapDispatchToProps)(VistaPeliculas);