import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//Comunes
import Header from './Comunes/Header/Header';
import Footer from './Comunes/Footer/Footer';
//Containers.
import VistaActores from './Containers/VistaActores/VistaActores';
import VistaPeliculas from './Containers/VistaPeliculas/VistaPeliculas';
import VistaRegistro from './Containers/VistaRegistro/VistaRegistro';
import VistaLogin from './Containers/VistaLogin/VistaLogin';
import VistaFichaPelicula from './Containers/VistaFichaPelicula/VistaFichaPelicula';
import VistaFichaActor from './Containers/VistaFichaActor/VistaFichaActor';
//Router
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//Redux.
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//Reducers.
import usuarioReducer from './Redux/Reducers/usuarioReducer';
import peliculasReducer from './Redux/Reducers/peliculaReducer';
import actoresReducer from './Redux/Reducers/actoresReducer';
import watchListReducer from './Redux/Reducers/watchListReducer';
//CombineReducer
const rootReducer = combineReducers({ usuario: usuarioReducer, peliculas: peliculasReducer, actores: actoresReducer, favoritos: watchListReducer });
//Store.
const Store = createStore(rootReducer);
//Routes.
const Routes = (
    <BrowserRouter>
        <Provider store={Store}>
            <Header />
            <Switch>
                <Route path="/" component={VistaLogin} exact />
                <Route path="/registro" component={VistaRegistro} exact />
                <Route path="/peliculas" component={VistaPeliculas} exact />
                <Route path="/actores" component={VistaActores} exact />
                <Route path="/pelicula/:id" component={VistaFichaPelicula} exact />
                <Route path="/actor/:id" component={VistaFichaActor} exact />
            </Switch>
            <Footer />
        </Provider>
    </BrowserRouter>
   
)

ReactDOM.render(Routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
