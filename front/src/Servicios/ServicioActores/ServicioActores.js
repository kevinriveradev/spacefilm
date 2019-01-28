class ServicioActores {

    constructor() {
        let user = JSON.parse(localStorage.getItem('sesion'));
        this.jwt = 'Bearer ' + user.jwt;
    }

    async cargarActores() {
        let actores_url = "http://localhost:4000/actors/";
        let resultado = fetch(actores_url, {
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
            });
        return resultado;
    }
    async cargarActor(idActor) {
        let actores_url = "http://localhost:4000/actors/actorid";
        let consulta = {
            "actor":parseInt(idActor)
        }
        console.log(consulta);
        let resultado = fetch(actores_url, {
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
        });
        return resultado;
    }

}

export default ServicioActores;