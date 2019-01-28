import React, { Component } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
class Favorita extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let url_poster = 'http://localhost:3000/images/posters/' + this.props.pelicula.poster;
        let url_film = '/pelicula/' + this.props.pelicula.id;
        return (
            <div className="Favorita">
                <img className="FavoritaCaratula" src={url_poster} />
                <NavLink className="FavoritaTitulo" to={url_film}>{this.props.pelicula.title}</NavLink>
            </div>
            )
    }
}

export default Favorita;