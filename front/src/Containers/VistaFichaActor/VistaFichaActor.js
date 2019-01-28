import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

//Servicios
import ServicioActores from '../../Servicios/ServicioActores/ServicioActores';
class VistaFichaActor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'ID': props.match.params.id,
            'ACTOR':[],
            'Peliculas':[]
        }
    }

    componentWillMount() {
        if (this.props.usuario.length == 0) {
            this.props.history.push('/');
        } else {
            this.buscarActor();
        }
    }

    async buscarActor() {
        let servicio = new ServicioActores();
        let result = await servicio.cargarActor(this.state.ID);
        this.setState({ 'ACTOR': result[0] });
        this.setState({ 'Peliculas': this.state.ACTOR.Movies });
    }

    render() {
       
        let url_img_actor = "http://localhost:3000/images/avatars/" + this.state.ACTOR.picture;
        console.log(this.state.Peliculas);
        return (
            <div className="ContainerFichaActor">
                <div className="FichaPelicula">
                    <div className="avatar">
                        <img src={url_img_actor} alt="actor" />
                    </div>
                    <div className="Descripcion">
                        <h2>{this.state.ACTOR.name}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th className="th">Peliculas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Peliculas.map((pelicula) =>
                                        <tr>{pelicula.title}</tr>
                                        )
                                }

                            </tbody>
                        </table>
                      
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usuario: state.usuario
    }
}

export default connect(mapStateToProps)(VistaFichaActor);