import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Componentes.
import VistaLogin from './Containers/VistaLogin/VistaLogin';
import VistaRegistro from './Containers/VistaRegistro/VistaRegistro';
import VistaPeliculas from './Containers/VistaPeliculas/VistaPeliculas';
import VistaActores from './Containers/VistaActores/VistaActores';


class App extends Component {
  render() {
    return (
        <div>
            <VistaLogin />
            <VistaRegistro />
            <VistaPeliculas />
            <VistaActores />
        </div>
    );
  }
}

export default App;
