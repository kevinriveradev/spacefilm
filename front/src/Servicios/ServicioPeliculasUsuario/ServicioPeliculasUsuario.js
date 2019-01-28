


class ServicioPeliculasUsuario {

    constructor() {
        let user = JSON.parse(localStorage.getItem('sesion'));
        this.jwt = 'Bearer ' + user.jwt;
    }
    
	async obtenerFavoritas(){
		let url_favoritas = "http://localhost:4000/movies/favoritos";
		try {
			let result = await fetch(url_favoritas,
                {       
                	headers: {
                		'Accept': 'application/json',
                		'Content-Type': 'application/json',
                		'Authorization': this.jwt
                	},
                	method: "POST",
                });
			return result.json();
		} catch (error) {
			console.log(error);
		}        
    }
    async agregarFavorita(userId,movieId) {
        let add_favorita = "http://localhost:4000/movies/agregarfavorito";
        try {
            let result = await fetch(add_favorita,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.jwt
                    },
                    method: "POST",
                    body: JSON.stringify({
                        'userId': userId,
                        'movieId': movieId
                    })
                });
            return result.json();
        } catch (error) {
            console.log(error);
        }        
    }
    async borrarFavorita(idusuario,idmovie  ) {
        let borrar_favorita = "http://localhost:4000/movies/borrarfavorito";
        try {
            let result = await fetch(borrar_favorita,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.jwt
                    },
                    method: "POST",
                    body: JSON.stringify({
                        'usuario': idusuario,
                        'movie': idmovie
                    })
                });
            return result.json();
        } catch (error) {
            console.log(error);
        }
    }
}

export default ServicioPeliculasUsuario;