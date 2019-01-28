import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
//Servicios.
import ServicioPeliculas from '../../../Servicios/ServicioPeliculas/ServicioPeliculas';
import ServicioPeliculasUsuario from '../../../Servicios/ServicioPeliculasUsuario/ServicioPeliculasUsuario';
//Acciones
import { cargarWatchList } from '../../../Redux/Actions/watchListAccion';
//Componentes
import Favorita from './favorita/favorita';
class Favoritos extends Component {

    constructor(props) {
        super(props);
        this.obtenerPeliculas = this.obtenerPeliculas.bind(this);
        this.state = {
            'peliculas':[]
        }
        
    }

    componentWillMount() {
        this.obtenerPeliculas();
    }
   
    async obtenerPeliculas() {
        let service = new ServicioPeliculasUsuario();
        let result = await service.obtenerFavoritas();
        this.toStore(result.data);
        //Iteramos sobre cada fila de la tabla y buscamos
        //la pelicula mediante su id.
        let data = [];
        for (var i = 0; i < result.data.length; i++) {
            let servicio = new ServicioPeliculas();
            let resu = await servicio.cargarPelicula(result.data[i].movieId);
            data.push(resu[0]);
        }
        this.setState({ 'peliculas': data });
    }

    toStore(data) {
        this.props.dispatch(cargarWatchList(data));
    }

    render() {
        return (
            <div className="Favoritos">
                <h2 className="fav">Peliculas Favoritas</h2>
                <hr />
                {
                    this.state.peliculas.map((pelicula) =>
                        <div key={pelicula.id} className="peliculaFavorita">
                            <hr />
                            <Favorita  pelicula={pelicula} /> 
                        </div>
                       
                        )
                } 
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritas:state.favoritos
    }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Favoritos)