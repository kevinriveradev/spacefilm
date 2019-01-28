const usuarioReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_USUARIO':
            return state.concat([action.data]);
        case 'CERRAR_SESION':
            return []
        default:
            return state
    }
}

export default usuarioReducer;