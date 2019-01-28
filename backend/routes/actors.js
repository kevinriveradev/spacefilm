var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', (req, res) => {
    models.Actor.findAll({
        include: [
            {
                model: models.Movie
            }
        ]
    })
    .then(actors => {
        res.status(200).json({
            error: false,
            data: actors
        })
    })
    
});

router.post('/actorid', (req, res) => {
    console.log('actor')
    let idActor = req.body.actor;
    models.Actor.findAll({
        where: {
            id: idActor
        },
        include:[
            {
                model: models.Movie
            }
        ]
    }).then(actors => {
            res.status(200).json({
                error: false,
                data: actors
            })
        })

});

module.exports = router;
