import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
class Actor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'url':'/actor/'+this.props.actor.id
        }
    }

    render() {
        let url_icon = "http://localhost:3000/images/avatars/" + this.props.actor.picture;

        return (
            <div className="Actor">
                <div className="actorFoto">
                    <img src={url_icon} alt="film" />
                </div>
                <div className="actorNombre">
                    <h4>{this.props.actor.name}</h4>
                    <button className="boton">
                        <NavLink to={this.state.url}><span>ficha de actor</span></NavLink>
                    </button>
                </div>
            </div>           
        );
    }
}

export default Actor;