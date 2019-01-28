const actoresReducer = (state = [], action) => {
    switch (action.type) {
        case 'CARGAR_ACTORES':
            return state.concat(action.data);
        default:
            return state;
    }
}

export default actoresReducer;