class ServicioPeliculas {
    constructor() {
        let user = JSON.parse( localStorage.getItem('sesion'));
        this.jwt = 'Bearer '+ user.jwt;
    }
    async cargarPeliculas() {
        let films_url = 'http://localhost:4000/movies/';
        let films;
        try {
            films = await fetch(films_url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.jwt
                }
            }).then((res) => {
                return res.json();
                }).then((data) => {
                    return data.data;
                })
        } catch (error) {
            console.log('Error->' + error);
        }
        return films;
    }

    async cargarPeliculaPorTitulo(titulo) {
        let films_url = 'http://localhost:4000/movies/movie';
        let films;
        let consulta = {
            "title":titulo
        }
        
        try {
            films = await fetch(films_url, {
                method: 'POST',
                body: JSON.stringify(consulta),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.jwt
                }
                
            }).then((res) => {
                return res.json();
            }).then((data) => {
                return data.data;
            })
        } catch (error) {
            console.log('Error->' + error);
        }
        return films;
    }
    async cargarPelicula(id) {
        let films_url = 'http://localhost:4000/movies/movieid';
        let films;
        let consulta = {
            'id': parseInt(id)
        }
        
        try {
            films = await fetch(films_url, {
                method: 'POST',
                body: JSON.stringify(consulta),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.jwt
                }

            }).then((res) => {
                return res.json();
            }).then((data) => {
                return data.data;
            })
        } catch (error) {
            console.log('Error->' + error);
        }
        return films;
    }
}




export default ServicioPeliculas;