const peliculasReducer = (state = [], action) => {
    switch (action.type) {
        case 'CARGAR_PELICULAS':
            return state = action.data;
        default:
            return state;
    }
}

export default peliculasReducer;