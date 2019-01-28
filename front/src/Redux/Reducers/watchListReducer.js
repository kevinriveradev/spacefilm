const watchListReducer = (state = [], action) => {
    switch (action.type) {
        case 'CARGAR_PELICULAS_FAVORITAS':
            return state = action.data;
        default:
            return state;
    }
}
export default watchListReducer;