import React, { Component } from 'react';
import ServicioPeliculas from '../../../Servicios/ServicioPeliculas/ServicioPeliculas';
import './style.css'
//Servicios
import { connect } from 'react-redux';
//Actions
import { cargarPeliculas } from '../../../Redux/Actions/peliculasAccion';

class Filtrador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "campo_titulo": '',
            "campo_genero": '0',
            "hayTexto": false,
            "hayGnero":false
        }
        this.manejadorTitulo = this.manejadorTitulo.bind(this);
        this.manejadorGenero = this.manejadorGenero.bind(this);
        this.manejadorBuscar = this.manejadorBuscar.bind(this);
    }

    manejadorTitulo(event) {
        this.setState({ 'campo_titulo': event.target.value });
    }
    manejadorGenero(event) {
        this.setState({ 'campo_genero': event.target.value });
    }

    manejadorBuscar(event) {
       
        event.preventDefault();
        //Desde aqui comprobamos que sistema de filtrado vamos a usar.
        if (this.state.campo_titulo.length > 1) {
            if (this.state.campo_genero != '0') {
                this.FiltradoMixto(this.state.campo_titulo, this.state.campo_genero);
            } else {
                this.FiltrarPorTitulo(this.state.campo_titulo);
            }
        } else {
            //Comprobamos si existe genero.
            if (this.state.campo_genero != '0') {
                this.FiltrarPorGenero(this.state.campo_genero);
            } 
            if (this.state.campo_genero == '0') {
                this.todos();
            }
        }
    }

    //Metodos de filtrado.
    async todos() {
        let servicio = new ServicioPeliculas();
        let result = await servicio.cargarPeliculas();
        this.toStore(result);
    }
    async FiltrarPorTitulo(titulo) {
        
        let servicio = new ServicioPeliculas();
        let result = await servicio.cargarPeliculaPorTitulo(titulo);
        this.toStore(result);
    }

    async FiltrarPorGenero(idgenero) {
        
        let servicio = new ServicioPeliculas();
        let result = await servicio.cargarPeliculas();
        //Tenemos que recorrer el array y filtrar por genero.
        let peliculasFiltradas = [];
        //result[i].Genres[0].id -> Ruta de id de pelicula
        for (var i = 0; i < result.length; i++) {
            if (result[i].Genres[0].id == idgenero) {
                peliculasFiltradas.push(result[i]);
            }
        }
        if (idgenero == 0) {
            this.props.dispatch(cargarPeliculas(result));
        } else {
            this.props.dispatch(cargarPeliculas(peliculasFiltradas));
        }
    }
    async FiltradoMixto(titulo, idgenero) {
        console.log('mixto');
        let servicio = new ServicioPeliculas();
        let result = await servicio.cargarPeliculaPorTitulo(titulo);
        //Tenemos que recorrer el array y filtrar por genero.
        let peliculasFiltradas = [];
        //result[i].Genres[0].id -> Ruta de id de pelicula
        for (var i = 0; i < result.length; i++) {
            if (result[i].Genres[0].id == idgenero) {
                peliculasFiltradas.push(result[i]);
            }
        }
        this.props.dispatch(cargarPeliculas(peliculasFiltradas));
       
    }
    //Metodos Dispatch

    toStore(data) {
        this.props.dispatch(cargarPeliculas(data));
    }

    render() {
        return (
            <div className="contenedorFiltrador">
                <div className="formularioFiltro">
                    <form onSubmit={this.manejadorBuscar}>
                        <label>
                            <input className="input" value={this.state.campo_titulo} onChange={this.manejadorTitulo} placeholder="Titulo de pelicula" />
                        </label>
                        <label>
                            <select className="input" value={this.state.campo_genero} onChange={this.manejadorGenero}>
                                <option value="0">Todas</option>
                                <option value="1">Horror</option>
                                <option value="2">Comedia</option>
                                <option value="3">Drama</option>
                                <option value="4">Accion</option>
                                <option value="5">Aventura</option>
                                <option value="6">Ciencia ficcion</option>
                                <option value="7">Del oeste</option>
                            </select>
                        </label>
                        <label>
                            <input className="btnbuscar boton" type="submit" value="Buscar" />
                        </label>
                    </form>
                </div>
            </div>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}

export default connect(mapDispatchToProps)(Filtrador);