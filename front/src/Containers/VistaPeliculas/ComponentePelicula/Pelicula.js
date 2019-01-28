import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
class Pelicula extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'url':'/pelicula/'+this.props.pelicula.id
        }
    }
    
    render() {
        let url_imagen = 'http://localhost:3000/images/posters/' + this.props.pelicula.poster;
        return (
            <div className="Pelicula">
                <div className="itemPelicula">
                    <img className="posterPelicula" src={url_imagen} alt="film" />
                </div>
                <div className="itemPelicula">
                    <h4 className="tituloPelicula">{this.props.pelicula.title}</h4>
                </div>
                <div className="itemPelicula">
                    <button className="boton btnFilm">
                        <NavLink to={this.state.url}><span>Ver pelicula</span></NavLink>
                    </button>
                    
                </div>
            </div>
        )
    }

}
export default Pelicula;