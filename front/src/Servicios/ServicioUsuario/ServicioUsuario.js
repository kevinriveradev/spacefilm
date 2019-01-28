class ServicioUsuario {

    async loguearUsuario(user) {
        let login_url = "http://localhost:4000/login";
        try {
            let result = await fetch(login_url,
                {
                
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                });
            if (result.status == 200) { return result.json() }
            if (result.status == 401) {return null}
        } catch (error) {
            console.log(error);
        }        
    }

    async registrarUsuario(user) {
        let registro_url = "http://localhost:4000/register";
        try {
            let result = await fetch(registro_url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                });
            if (result.status == 200) return result.json();
            return null;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ServicioUsuario;

