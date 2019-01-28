export const loginUsuario = (data) => {
    return {
        type: 'LOGIN_USUARIO',
        data: data
    }
}

export const cerrarSesion = () => {
    return {
        type: 'CERRAR_SESION',
        data: []
    }
}