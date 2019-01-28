import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
//Connect
import { connect } from 'react-redux';
//Servicios
import ServicioPeliculas from '../../Servicios/ServicioPeliculas/ServicioPeliculas';
import ServicioPeliculasUsuario from '../../Servicios/ServicioPeliculasUsuario/ServicioPeliculasUsuario';
//Actions
import { cargarWatchList } from '../../Redux/Actions/watchListAccion';

class VistaFichaPelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'ID': props.match.params.id,
            'Pelicula': [],
            'Actores': [],
            'favoritos': [],
            'idUsuario': 0,
            'autenticado':false
        }
        
        this.agregarWatchList = this.agregarWatchList.bind(this);
        this.borrarWatchList = this.borrarWatchList.bind(this);
        this.saveStore = this.saveStore.bind(this);
        this.prueba = this.prueba.bind(this);
    }
    componentWillMount() {
        if (this.props.usr.length > 0) {
            this.buscarPelicula();
            this.cargarWatchLis();
        } else {
            this.props.history.push('/');
        }
    }
    async cargarWatchLis() {
        let servicio = new ServicioPeliculasUsuario();
        let result = await servicio.obtenerFavoritas();
        this.saveStore(result);
    }

    async buscarPelicula() {
        let servicio = new ServicioPeliculas();
        let result = await servicio.cargarPelicula(this.state.ID);
        this.setState({ Pelicula: result[0] });
        this.setState({ Actores: result[0].Actors });
    }
    async agregarWatchList() {
        let servicio = new ServicioPeliculasUsuario();
        let resultado = await servicio.agregarFavorita(this.state.idUsuario, this.state.ID);
        this.cargarWatchLis();
    }
    async borrarWatchList() {
        let servicio = new ServicioPeliculasUsuario();
        let resultado = await servicio.borrarFavorita(this.state.idUsuario, this.state.ID);
        this.cargarWatchLis();
    }
    saveStore(data) {
        
        this.props.dispatch(cargarWatchList(data))
        this.setState({ 'favoritos': this.props.fav.data });
        this.setState({ 'idUsuario': this.props.usr[0].usuario.id });
    }
    prueba() {
       
        for (var i = 0; i < this.state.favoritos.length; i++) {
            if (this.state.favoritos[i].movieId == this.state.ID) {
                let botonBorrar = <button className="boton" onClick={this.borrarWatchList}>Borrar de favoritos</button>
                return botonBorrar;
            }
        }
        let botonAgregar = <button className="boton" onClick={this.agregarWatchList}>Agregar a favoritos</button>
        return botonAgregar;
    }
    render() {
        let url_imagen = 'http://localhost:3000/images/posters/' + this.state.Pelicula.poster;
        let botonWatchList = this.prueba();
        return (
            <div className="ContainerFichaPelicula">
                <div className="fichaPelicula">
                    <div className="contendorPoster">
                        <img src={url_imagen} alt="pelicula" />
                    </div>
                    <div className="contenedorInformacion">
                        <h1>{this.state.Pelicula.title}</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th className="th">Actores</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Actores.map((actor) =>
                                        <tr key={actor.id}>
                                            <th>{actor.name}</th>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                        <div >
                            {botonWatchList}
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fav: state.favoritos,
        usr: state.usuario,
    }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(VistaFichaPelicula);