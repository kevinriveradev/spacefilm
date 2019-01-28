var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');



router.get('/', (req, res) => {
    // get all movies with its actors
    models.Movie.findAll({
        include: [
            {
                model: models.Actor,
            },
            {
                model:models.Genre,
            }
        ]
    })
    .then(movies => {
        res.status(200).json({
            error: false,
            data: movies
        })
    })
});

router.post('/movie', (req, res) => {
    console.log('---->' + req.body.title);
    // find movies where title includes content of title parameter (and include its actors)
    models.Movie.findAll({
        where: {
            title: {
                $like: '%' + req.body.title + '%'
            }
        },
        include: [
            {
                model: models.Actor,
            }, {
                model: models.Genre
            }
        ]
    }).then(movies => {
        res.status(200).json({
            error: false,
            data: movies
        })
    });
    
})

router.post('/movieid', (req, res) => {
    let idPelicula = req.body.id;
    models.Movie.findAll({
        where: {
            id: idPelicula
        },
        include: [
            {
                model: models.Actor,
            }, {
                model: models.Genre
            }
        ]
    }).then(movies => {
        res.status(200).json({
            error: false,
            data: movies
        })
    });;
});

//WatchList Routes.

router.post('/favoritos', async (req, res) => {
    let idUsuario = req.user.id;
    models.UserMovies.findAll({
        where: {
            userId: idUsuario
        }
    }).then(favoritos => {
        res.status(200).json({
            error: false,
            data: favoritos
        })
    });
})

router.post('/agregarfavorito', (req, res) => {
    let idUser = req.body.userId;
    let idMovie = req.body.movieId;
    let model = {
        'userId': idUser,
        'movieId':idMovie
    }
    try {
        models.UserMovies.create(model).then((respuesta) => {
            res.status(200).json({
                error: false
            });
        });
    } catch (error) {
        console.log(error);
    }
    
})

router.post('/borrarfavorito', (req, res) => {
    let usuario = req.body.usuario;
    let movie = req.body.movie;
    models.UserMovies.destroy({
        where: {
            userId:usuario,
            movieId:movie,
        }
    }).then((respuesta) => {
        res.status(200).json({
            error: false
        });
    })
})


module.exports = router;
